using files_in_cloud_server.Data;
using files_in_cloud_server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace files_in_cloud_server.Services
{
  public class DocumentService
  {
    private readonly Context _context;

    public DocumentService(
      Context context
      )
    {
      _context = context;
    }

    public Document CreateUpdate(Document document)
    {
      document.contentLength = document.data.Length;
      var fileData = document.data;
      if (_context.Documents.Any(d => d.filename == document.filename))
      {
        _context.Documents.Update(document);
      }
      else
      {
        _context.Documents.Add(document);
      }
      _context.SaveChanges();
      // todo, upload fileData to azure
      return document;
    }

    public IEnumerable<Document> ListAll()
    {
      var documents = _context.Documents.ToList();

      return documents;
    }

    public Document Download(string filename)
    {
      var document = _context.Documents.First(d => d.filename == filename);
      // todo, get data from azure
      document.data = new byte[] { };
      return document;
    }
  }
}
