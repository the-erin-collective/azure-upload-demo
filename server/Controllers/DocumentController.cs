using azure_upload_demo_server.Models;
using azure_upload_demo_server.Services;
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
    private readonly DocumentService _documentService;

    public DocumentController(ILogger<DocumentController> logger, DocumentService documentService)
    {
      _logger = logger;
      _documentService = documentService;
    }

    [HttpGet]
    public string Get()
    {
      return "azure-upload-demo server is online.";
    }

    [HttpPost]
    public IEnumerable<Document> ListAll()
    {
      var documents = _documentService.ListAll();
      return documents;
    }

    [HttpPost]
    public Document Upload(Document document)
    {
      document = _documentService.CreateUpdate(document);
      return document;
    }

    [HttpPost]
    public Document Download(Guid documentId)
    {
      return _documentService.Download(documentId);
    }
  }
}
