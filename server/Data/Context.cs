using azure_upload_demo_server.Models;
using FileContextCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace azure_upload_demo_server.Data
{
  public class Context : DbContext
  {
    public DbSet<Document> Documents { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      //Default: JSON-Serializer
      optionsBuilder.UseFileContextDatabase("temp-document-store", null, null, null, null);
    }
  }
}
