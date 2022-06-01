using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace azure_upload_demo_server.Models
{
  public class Document
  {
    public Guid Id { get; set; }
    public DateTimeOffset DateCreated { get; set; }
    public DateTimeOffset DateLastModified { get; set; }
    public string Filename { get; set; }
    [NotMapped]
    public byte[] Data { get; set; }
  }
}
