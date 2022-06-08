using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace files_in_cloud_server.Models
{
  public class UploadResponse
  {
    public string errorMessage { get; set; }
    public Document data { get; set; }
  }
}
