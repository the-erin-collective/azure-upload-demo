const tablesModule = require('./tables.ts');
const spinnerModule = require('./spinner.ts');
const apiModule = require('./api.ts');

let listCommand = async (arg, options) => {
    let error = null;
    let result = await spinnerModule.start('fetching list of files from the cloud...', 'list of files successfully fetched!', 'could not get the list of files from the cloud...\n:(', null, async (data) => {
    let output = apiModule.list().then((data) => { return data; });
      return output;
    }).then((data) => {
      return data;
    }).catch(err => {
        error = err;
    });
    if(error){
        console.log(tablesModule.simple('error listing files', error, true));
        return;
    }
    if(typeof(result) === "undefined" || result.length == 0){
        console.log(tablesModule.simple('file list', 'there are no files stored on the cloud', true));
        return;
    }
    let output = tablesModule.spreadsheet([
      { value: 'filename', alias: 'name'},
      { value: 'dateLastModified', alias: 'last modified'},
      { value: 'contentLength', alias: 'size'}]
        , result, true);
    console.log(output);
}

let uploadCommand = async (arg, options) => {
    let filepath = arg;
    let error = null;
    let result = await spinnerModule.start('uploading ' +  filepath + ' to the cloud...', 'upload successful!', 'an error occurred while trying to upload the file to the cloud...\n:(', filepath, async (filepath) => {
      let output = apiModule.upload(filepath)
        .then((data) => { 
            return data;
        }).catch(err => {
           return { errorMessage: err, data: null};
        });
      return output;
    }).then((data) => {
      return data;
    }).catch(err => {
      error = err;
    });
    if(error){
      console.log(tablesModule.simple('file upload error', error, false));
      return;
    }
    if(result.errorMessage.length > 0){
      console.log(tablesModule.simple('file upload error', result.errorMessage, false));
      return;
    }
    if(result.data == null){
        console.log(tablesModule.simple('file upload error', 'the files-in-cloud server is behaving odd', false));
        return;
    }
    let output = tablesModule.spreadsheet([
      { value: 'filename', alias: 'name'},
      { value: 'dateLastModified', alias: 'last modified'},
      { value: 'contentLength', alias: 'size'}]
        ,  [result.data], true);

    console.log(output);
};

let downloadCommand = async (arg, options) => {
    let filename = 'testname';
    let result = await spinnerModule.start('downloading ' +  filename + ' from the cloud...', 'download successful!', 'an error occurred whyle trying to download the file from the cloud...\n:(', filename, async (filepath) => {
      let output = apiModule.download(filepath).then((data) => { return data; });
      return output;
    }).then((data) => {
      return data;
    }).catch(err => {
      console.log(err);
    }); 
    // only if no error...
    let output = tablesModule.simple('file downloaded', result, false);
    console.log(output);
};

module.exports = {
    upload: uploadCommand,
    list: listCommand,
    download: downloadCommand
};