const { Command } = require('commander');
const tables = require('./modules/tables.ts');
const help = require('./modules/help.ts');
const spinner = require('./modules/spinner.ts');
const api = require('./modules/api.ts');

const programName = 'fic';

const program = new Command();

program
  .name(programName)
  .description('Access cloud file storage')
  .version('0.0.0')
  .usage('[options] [command]')
  .showHelpAfterError(true)
  .action((arg, cmd) => {
    program.help();
   });

program
  .configureHelp({
  formatHelp: (cmd, helper) => { 
    let header = 'help: ' + cmd._name;
    if(cmd._name === programName){
      header = 'Unrecognized command, try one of these...';
    }
    return tables.simple(header, help.formatHelp(cmd, helper).trim(), true);
   }
 });

 program
   .configureOutput({
     outputError: (str, write) => {
       const errorPrefix = 'error: ';
       let prefixIndex = str.indexOf(errorPrefix);
       let errorMessage = str;
       if(prefixIndex === 0){
        errorMessage = errorMessage.substring(errorPrefix.length).trim();
       }
       write(tables.simple('error', errorMessage, false));
      }
  });

program
  .command('list')
  .description('list files in the cloud')
  .action(async (arg, options) => {
    let result = await spinner.start('fetching list of files from the cloud...', 'list of files successfully fetched!', null, async (data) => {
      let output = api.list().then((data) => { return data; });
      return output;
    }).then((data) => {
      return data;
    }).catch(err => {
      console.log(err);
    });
    let output = tables.spreadsheet([
      { value: 'filename', alias: 'name'},
      { value: 'dateLastModified', alias: 'last modified'},
      { value: 'contentLength', alias: 'size'}]
        , result, true);
    console.log(output);}
  );

program
  .command('upload')
  .argument('<filepath>', 'path to file being uploaded')
  .description('upload a file to the cloud')
  .action(async (arg, options) => {
    let filepath = 'testpath';
    let result = await spinner.start('uploading ' +  filepath + ' to the cloud...', 'upload successful!', filepath, async (filepath) => {
      let output = api.upload(filepath).then((data) => { return data; });
      return output;
    }).then((data) => {
      return data;
    }).catch(err => {
      console.log(err);
    });
    // only if no error...
    let output = tables.simple('file uploaded', result, false);
    console.log(output);
  });
  
program
  .command('download')
  .argument('<filename>', 'name of file being downloaded')
  .description('download a file from the cloud')
  .action(async (arg, options) => {
    let filename = 'testname';
    let result = await spinner.start('downloading ' +  filename + ' from the cloud...', 'download successful!', filename, async (filepath) => {
      let output = api.download(filepath).then((data) => { return data; });
      return output;
    }).then((data) => {
      return data;
    }).catch(err => {
      console.log(err);
    }); 
    // only if no error...
    let output = tables.simple('file downloaded', result, false);
    console.log(output);
  });

program.parse();
