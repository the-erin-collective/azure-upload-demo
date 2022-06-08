using files_in_cloud_server.Data;
using files_in_cloud_server.Models;
using files_in_cloud_server.Helpers;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using azure_upload_demo_server.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Azure.Storage.Blobs.Models;

namespace files_in_cloud_server.Services
{
  public class DocumentService
  {
    private readonly Context _context;
    private readonly AppConfig _config;

    public DocumentService(
      Context context,
      IConfiguration Configuration
      )
    {
      _config = Configuration.GetSection("AzureBlobStorage").Get<AppConfig>();
      _context = context;
    }

    public async Task<UploadResponse> CreateUpdate(Document document, IFormFile imageFile)
    {
      try
      {
        var response = new UploadResponse()
        {
          data = null,
          errorMessage = ""
        };
        var documentDataValidationError = ValidationHelper.ValidateDocumentModel(document);
        if (!string.IsNullOrWhiteSpace(documentDataValidationError))
        {
          response.errorMessage = documentDataValidationError;
          response.data = null;
          return response;
        }

        var documentImageValidationError = ValidationHelper.ValidateDocumentFormImage(imageFile);
        if (!string.IsNullOrWhiteSpace(documentImageValidationError))
        {
          response.errorMessage = documentImageValidationError;
          response.data = null;
          return response;
        }

        if (_context.Documents.Any(d => d.filename == document.filename))
        {
          _context.Documents.Update(document);
        }
        else
        {
          _context.Documents.Add(document);
        }
        _context.SaveChanges();

        var blobContent = new byte[] { };
        using (var ms = new MemoryStream())
        {
          imageFile.CopyTo(ms);
          blobContent = ms.ToArray();
        }

        var connectionString = _config.ConnectionString;
        var containerName = _config.BlobContainerName;
        var blobName = document.filename;

        var containerClient = new BlobContainerClient(connectionString, containerName);
        var containerInfo = await containerClient.CreateIfNotExistsAsync();

       // containerClient.

        var blob = containerClient.GetBlobClient(blobName);
        var azureResponse = await blob.UploadAsync(new BinaryData(blobContent), overwrite: true);

        return new UploadResponse()
        {
          errorMessage = "",
          data = document
        };
      }
      catch (Exception ex)
      {
        return await Task.FromException<UploadResponse>(ex);
      }
    }

    public async Task<IEnumerable<Document>> ListAll()
    {
      var documents = await _context.Documents.ToListAsync();

      return documents;
    }

    public async Task<Document> Download(string filename)
    {
      var document = _context.Documents.First(d => d.filename == filename);

      var connectionString = _config.ConnectionString;
      var containerName = _config.BlobContainerName;
      var blobName = document.filename;

      var container = new BlobContainerClient(connectionString, containerName);
      container.CreateIfNotExists();

      var blob = container.GetBlobClient(blobName);

      var blobContent = new byte[] { };
      using (var ms = new MemoryStream())
      {
        var azureResponse = await blob.DownloadToAsync(ms);

      }

      

      // todo, get data from azure
      document.data = new byte[] { };
      return document;
    }
  }
}
