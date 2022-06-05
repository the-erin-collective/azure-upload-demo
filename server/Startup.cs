using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using FileContextCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using files_in_cloud_server.Data;
using files_in_cloud_server.Services;
using SimpleInjector;
using SimpleInjector.Integration.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using files_in_cloud_server.Controllers;

namespace files_in_cloud_server
{
  public class Startup
  {
    private Container container = new Container();

    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddOptions();
      services.AddSingleton(container);
      services.AddControllers()
          .AddApplicationPart(typeof(DocumentController).Assembly);
      services.AddSingleton<IControllerActivator>(new SimpleInjectorControllerActivator(container));
      services.AddSimpleInjector(container, options => {
        options.AddAspNetCore()
          .AddControllerActivation();
      });
      services.AddDbContext<Context>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseSimpleInjector(container);

      container.Register<DocumentService>(Lifestyle.Scoped);

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
