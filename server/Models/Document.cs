using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace files_in_cloud_server.Models
{
  public class Document
  {
    public DateTimeOffset dateCreated { get; set; }
    public DateTimeOffset dateLastModified { get; set; }
    public long contentLength { get; set; }
    [Key]
    public string filename { get; set; }
    [NotMapped]
    public byte[] data { get; set; }
  }
}
