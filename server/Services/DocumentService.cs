using azure_upload_demo_server.Data;
using azure_upload_demo_server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace azure_upload_demo_server.Services
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
      var fileData = document.Data;
      if (_context.Documents.Any(d => d.Filename == document.Filename))
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

    public Document Download(Guid documentId)
    {
      var document = _context.Documents.First(d => d.Id == documentId);
      // todo, get data from azure
      document.Data = new byte[] { };
      return document;
    }
  }
}
