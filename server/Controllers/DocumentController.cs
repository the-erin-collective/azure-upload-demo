using azure_upload_demo_server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace azure_upload_demo_server.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class DocumentController : ControllerBase
  {
    private readonly ILogger<DocumentController> _logger;

    public DocumentController(ILogger<DocumentController> logger)
    {
      _logger = logger;
    }

    [HttpGet]
    public string Get()
    {
      return "azure-upload-demo server is online.";
    }

    [HttpPost]
    public IEnumerable<Document> All()
    {
      var documents = new List<Document>();
      return documents;
    }

    [HttpPost]
    public Document Upload(Document document)
    {
      return document;
    }

    [HttpPost]
    public Document Download(Guid documentId)
    {
      return new Document();
    }
  }
}
