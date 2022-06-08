using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace azure_upload_demo_server.Models
{
  public class AppConfig
  {
    public string BlobContainerName { get; set; }
    public string ConnectionString { get; set; }
  }
}
