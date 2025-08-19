using GlossaAPI.Features.FlashCards.Models;
using GlossaAPI.Features.FlashCards.Services;
using GlossaAPI.Mongo;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Amazon;
using Amazon.BedrockRuntime;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/axnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddHttpClient();

builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(policy =>
  {
    policy.WithOrigins("http://localhost:4200")
    .AllowAnyHeader()
    .AllowAnyMethod();
  });
});

builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDb"));

builder.Services.AddSingleton<IMongoClient>(x =>
{
  var settings = x.GetRequiredService<IOptions<MongoDbSettings>>().Value;
  return new MongoClient(settings.ConnectionString);
});

// Adds the Flash Cards Service to the DI list. Each new Service needs to do the same, also targetting a xecifc cluster.

builder.Services.AddSingleton<IUserContextService, UserContextService>();

builder.Services.AddScoped(x =>
  new FlashCardHandler<User>(
    x.GetRequiredService<IMongoClient>(),
    x.GetRequiredService<IOptions<MongoDbSettings>>().Value,
    "User"
    )
);

builder.Services.AddScoped(x =>
  new FlashCardHandler<Song>(
    x.GetRequiredService<IMongoClient>(),
    x.GetRequiredService<IOptions<MongoDbSettings>>().Value,
    "Songs"
    )
);

// Bedrock client (reads creds from env/CLI profile)
builder.Services.AddSingleton<IAmazonBedrockRuntime>(_ =>
    new AmazonBedrockRuntimeClient(RegionEndpoint.USEast1));

// Conversations collection handler (same pattern you use for Songs/User)
builder.Services.AddScoped(x =>
  new FlashCardHandler<Conversation>(
    x.GetRequiredService<IMongoClient>(),
    x.GetRequiredService<IOptions<MongoDbSettings>>().Value,
    "Conversations" // <— single shared collection, not one per convo
  )
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
}

app.UseHttpsRedirection();

app.UseHttpsRedirection();
app.UseSwagger();
app.UseCors();
app.UseSwaggerUI();
app.MapControllers();
app.Run();

