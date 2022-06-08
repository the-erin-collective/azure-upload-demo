using files_in_cloud_server.Helpers;
using files_in_cloud_server.Models;
using files_in_cloud_server.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
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
    public async Task<IEnumerable<Document>> ListAll()
    {
      var documents = await _documentService.ListAll();
      return documents;
    }

    [HttpPost]
    [Route("Upload")]
    public async Task<UploadResponse> Upload(IFormCollection data, IFormFile imageFile)
    {
      var response = new UploadResponse() { 
        data = null,
        errorMessage = ""
      };
      try
      {
        var errorMessage = ValidationHelper.ValidateDocumentFormCollection(data);
        if (!string.IsNullOrWhiteSpace(errorMessage))
        {
          response.errorMessage = errorMessage;
          return response;
        }

        var savedDoc = await _documentService.CreateUpdate(new Document()
        {
          filename = data["document.filename"],
          contentLength = long.Parse(data["document.contentLength"]),
          dateCreated = DateTime.Parse(data["document.dateCreated"]),
          dateLastModified = DateTime.Parse(data["document.dateLastModified"])
        }, imageFile);

        if(!string.IsNullOrWhiteSpace(savedDoc.errorMessage)){
          response.errorMessage = savedDoc.errorMessage;
          return response;
        } else {
          response.data = savedDoc.data;
          return response;
        }
      }
      catch (Exception ex)
      {
        response.errorMessage = ex.Message;
        response.data = null;
        return response;
      }
    }

    [HttpPost]
    [Route("Download")]
    public async Task<Document> Download(string documentId)
    {
      return await _documentService.Download(documentId);
    }
  }
}
