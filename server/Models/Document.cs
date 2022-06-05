using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace files_in_cloud_server.Models
{
  public class Document
  {
    public Guid Id { get; set; }
    public DateTimeOffset DateCreated { get; set; }
    public DateTimeOffset DateLastModified { get; set; }
    public long ContentLength { get; set; }
    public string Filename { get; set; }
    [NotMapped]
    public byte[] Data { get; set; }
  }
}
