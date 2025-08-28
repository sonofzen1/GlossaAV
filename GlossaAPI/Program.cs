using GlossaAPI.Features.FlashCards.Models;
using GlossaAPI.Features.FlashCards.Services;
using GlossaAPI.Mongo;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
<<<<<<< Updated upstream
=======
using Amazon;
using Amazon.BedrockRuntime;
using Amazon.Lambda.AspNetCoreServer.Hosting;
>>>>>>> Stashed changes

var builder = WebApplication.CreateBuilder(args);

// enables Lambda bootstrap when running in AWS Lambda
builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);

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
    policy.WithOrigins("https://glossalanguagelearning.com")
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
builder.Services.AddScoped(x =>
  new FlashCardHandler<FlashCard> (
    x.GetRequiredService<IMongoClient>(),
    x.GetRequiredService<IOptions<MongoDbSettings>>().Value,
    "FlashCards"
    )
);

builder.Services.AddScoped(x =>
  new FlashCardHandler<Deck>(
    x.GetRequiredService<IMongoClient>(),
    x.GetRequiredService<IOptions<MongoDbSettings>>().Value,
    "Decks"
    )
);


var app = builder.Build();

foreach (var kvp in app.Configuration.AsEnumerable())
{
  if (!string.IsNullOrEmpty(kvp.Value)) // skip nulls
    Console.WriteLine($"{kvp.Key} = {kvp.Value}");
}


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

