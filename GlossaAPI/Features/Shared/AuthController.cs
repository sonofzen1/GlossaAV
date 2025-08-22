using Microsoft.AspNetCore.Mvc;
using GlossaAPI.Features.FlashCards.Models;
using GlossaAPI.Mongo;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using MongoDB.Bson;
using System.Web;
using GlossaAPI.Features.FlashCards.Services;

namespace GlossaAPI.Features.Shared
{
  [ApiController]
  [Route("api/auth")]
  public class AuthController : ControllerBase
  {
    private readonly IMongoCollection<User> _users;
    private readonly IUserContextService _userContextService;

    public AuthController(IMongoClient client, IOptions<MongoDbSettings> settings, IUserContextService userContextService)
    {
      var db = client.GetDatabase(settings.Value.DatabaseName);
      _users = db.GetCollection<User>("User");
      _userContextService = userContextService;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup(string username, string password, string email)
    {

      username = HttpUtility.UrlDecode(username);
      password = HttpUtility.UrlDecode(password);
      email = HttpUtility.UrlDecode(email);

      // Validate inputs
      if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(email))
      {
        return BadRequest(new { message = "Username, password, and email are required" });
      }

      // Validate email format
      if (!Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
      {
        return BadRequest(new { message = "Invalid email format" });
      }

      // Check for existing username or email
      var existingUser = await _users.Find(u => u.Username == username || u.Email == email).FirstOrDefaultAsync();
      if (existingUser != null)
      {
        return Conflict(new { message = existingUser.Username == username ? "Username already exists" : "Email already exists" });
      }

      // Hash password
      string hash = HashPassword(password);

      // Create starter decks
      var starterDecks = new List<Deck>
        {
            new Deck
            {
                Title = "Verb Conjugations",
                Flashcards = new List<FlashCard>
                {
                    new FlashCard { Term = "to run (I)", Definition = "run" },
                    new FlashCard { Term = "to run (you)", Definition = "run" },
                    new FlashCard { Term = "to run (he/she)", Definition = "runs" },
                    new FlashCard { Term = "to eat (I)", Definition = "eat" },
                    new FlashCard { Term = "to eat (you)", Definition = "eat" },
                    new FlashCard { Term = "to eat (he/she)", Definition = "eats" },
                    new FlashCard { Term = "to sleep (I)", Definition = "sleep" },
                    new FlashCard { Term = "to sleep (you)", Definition = "sleep" },
                    new FlashCard { Term = "to sleep (he/she)", Definition = "sleeps" }
                }
            },
            new Deck
            {
                Title = "Basic Nouns",
                Flashcards = new List<FlashCard>
                {
                    new FlashCard { Term = "dog", Definition = "A common pet that barks" },
                    new FlashCard { Term = "cat", Definition = "A common pet that meows" },
                    new FlashCard { Term = "house", Definition = "A place where people live" },
                    new FlashCard { Term = "car", Definition = "A vehicle for transportation" },
                    new FlashCard { Term = "book", Definition = "A written or printed work" },
                    new FlashCard { Term = "tree", Definition = "A tall plant with a trunk" }
                }
            },
            new Deck
            {
                Title = "Greetings",
                Flashcards = new List<FlashCard>
                {
                    new FlashCard { Term = "Hello", Definition = "A greeting to say hi" },
                    new FlashCard { Term = "Goodbye", Definition = "A farewell to say bye" },
                    new FlashCard { Term = "Thank you", Definition = "An expression of gratitude" },
                    new FlashCard { Term = "Please", Definition = "A polite way to make a request" },
                    new FlashCard { Term = "Good morning", Definition = "A greeting used in the morning" }
                }
            }
        };

      // Create new user
      var user = new User
      {
        Username = username,
        PasswordHash = hash,
        Email = email,
        Decks = starterDecks,
        Songs = new List<int> { 10045902, 2892211, 9614104, 3968305 },
        ConversationId = ObjectId.GenerateNewId().ToString()
      };

      // Insert user into MongoDB
      await _users.InsertOneAsync(user);

      return Ok(new { message = "Signup successful", username = user.Username });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(string username, string password)
    {

      // Simple email regex: checks for format like "something@domain.com"
      bool isEmail = Regex.IsMatch(username ?? "", @"^[^@\s]+@[^@\s]+\.[^@\s]+$");

      // Query based on whether input is an email or username
      User user;
      if (isEmail)
      {
        user = await _users.Find(u => u.Email == username).FirstOrDefaultAsync();
      }
      else
      {
        user = await _users.Find(u => u.Username == username).FirstOrDefaultAsync();
      }

      if (user == null)
      {
        return Unauthorized(new { message = isEmail ? "Invalid email" : "Invalid username" });
      }

      if (!VerifyPassword(password, user.PasswordHash))
      {
        return Unauthorized(new { message = "Invalid password" });
      }

      _userContextService.SetUsername(user.Username);

      return Ok(new { message = "Login successful", username = user.Username });
    }

    // --- Helpers ---
    private string HashPassword(string password)
    {
      byte[] salt = RandomNumberGenerator.GetBytes(16);
      byte[] hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, 100000, HashAlgorithmName.SHA256, 32);

      return $"{Convert.ToBase64String(salt)}:{Convert.ToBase64String(hash)}";
    }

    private bool VerifyPassword(string password, string stored)
    {
      var parts = stored.Split(':');
      if (parts.Length != 2) return false;

      byte[] salt = Convert.FromBase64String(parts[0]);
      byte[] storedHash = Convert.FromBase64String(parts[1]);

      byte[] testHash = Rfc2898DeriveBytes.Pbkdf2(password, salt, 100000, HashAlgorithmName.SHA256, 32);

      return CryptographicOperations.FixedTimeEquals(storedHash, testHash);
    }
  }
}
