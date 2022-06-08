using files_in_cloud_server.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;

namespace files_in_cloud_server.Helpers
{
  public static class ValidationHelper
  {
    private static readonly int _maxFileSizeInMBs = 2;
    private static readonly long _maxFileSizeInBytes = (1048576) * _maxFileSizeInMBs;
    private static readonly List<string> validFileExtentions = new List<string> { ".png", ".gif", ".jpgeg", ".jpg", ".webp", ".svg", ".bmp" };

    private static List<KeyValuePair<string, string>> _documentKeysAndMissingErrors = new List<KeyValuePair<string, string>>() {
      new KeyValuePair<string, string>("document.filename", "file has no name information"),
      new KeyValuePair<string, string>("document.contentLength", "file has no size information"),
      new KeyValuePair<string, string>("document.dateCreated", "file has no creation date information"),
      new KeyValuePair<string, string>("document.dateLastModified", "file has no last modified date information")
    };

    public static string ValidateDocumentFormCollection(IFormCollection formCollection)
    {
      if (formCollection == null)
      {
        return "no file data present";
      }

      var errorMessage = "";
      _documentKeysAndMissingErrors.ForEach((formItem) => {
        if (!formCollection.ContainsKey(formItem.Key))
        {
          errorMessage = formItem.Value;
        }
      });

      return errorMessage;
    }

    public static string ValidateDocumentModel(Document document)
    {
      var result = "";
      try
      {
        if (document.dateCreated == DateTimeOffset.MinValue)
        {
          return "file has no creation date";
        }
        if (document.dateLastModified == DateTimeOffset.MinValue)
        {
          return "file has no last modified date";
        }
        if (document.dateLastModified == DateTimeOffset.MinValue)
        {
          return "file has no last modified date";
        }
        if (string.IsNullOrWhiteSpace(document.filename))
        {
          return "file has no name";
        }
        if (document.contentLength == 0)
        {
          return "file has no content";
        }
        if (document.contentLength > _maxFileSizeInBytes)
        {
          return "file size can not exceed " + _maxFileSizeInMBs + " megabytes";
        }
        return result;
      }
      catch (Exception ex)
      {
        return ex.Message;
      }
    }

    public static string ValidateDocumentFormImage(IFormFile imageFile)
    {
      var result = "";
      try
      {
        if (imageFile == null)
        {
          return "file is missing";
        }
        if (imageFile.Length == 0)
        {
          return "file is empty";
        }
        if (imageFile.Length > _maxFileSizeInBytes)
        {
          return "file is too large";
        }
        if (!validFileExtentions.Contains(Path.GetExtension(imageFile.FileName)))
        {
          return "file type not supported";
        }
        return result;
      }
      catch (Exception ex)
      {
        return ex.Message;
      }
    }
  }
}
