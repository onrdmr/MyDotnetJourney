using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(x=> {
    x.AddPolicy("CorsPolicy",policy=>{
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3001");
    });
});
builder.Services.AddDbContext<DataContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});


var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try 
    {
        var context = services.GetRequiredService<DataContext>();
        context.Database.Migrate();
        await Seed.SeedData(context);
    } catch (Exception exc){
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(exc,"Error during migration");
    }
}
 

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}


// app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
