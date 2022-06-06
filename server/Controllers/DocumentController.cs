using files_in_cloud_server.Models;
using files_in_cloud_server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace files_in_cloud_server.Controllers
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

    [HttpPost, HttpGet]
    [Route("ListAll")]
    public IEnumerable<Document> ListAll()
    {
      var documents = _documentService.ListAll();
      return documents;
    }

    [HttpPost]
    [Route("Upload")]
    public Document Upload([FromBody] Document document)
    {
      document = _documentService.CreateUpdate(document);
      return document;
    }

    [HttpPost]
    [Route("Download")]
    public Document Download(string documentId)
    {
      return _documentService.Download(documentId);
    }
  }
}
