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
      console.log(data);}
    );
  });

program
  .command('upload')
  .argument('<filepath>', 'path to file being uploaded')
  .description('upload a file to the cloud')
  .action(async (arg, options) => {
    let filepath = 'testpath';
    let result = await spinner.start('uploading ' +  filepath + ' to the cloud...', 'download successful!', filepath, async (filepath) => {
      let output = api.upload(filepath).then((data) => { return data; });
      return output;
    }).then((data) => {
      console.log(data);}
    );
  });
  
program
  .command('download')
  .argument('<filename>', 'name of file being downloaded')
  .description('download a file from the cloud')
  .action(async (arg, options) => {
    let filename = 'testname';
    let result = await spinner.start('downloading ' +  filename + ' from the cloud...', 'upload successful!', filename, async (filepath) => {
      let output = api.download(filepath).then((data) => { return data; });
      return output;
    }).then((data) => {
      console.log(data);}
    );
  });

program.parse();
