const { Command } = require('commander');
const tables = require('./modules/tables.ts');
const help = require('./modules/help.ts');
const api = require('./modules/api.ts');
const commands = require('./modules/commands.ts');

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
  .action(commands.list);

program
  .command('upload')
  .argument('<filepath>', 'path to file being uploaded')
  .description('upload a file to the cloud')
  .action(commands.upload);
  
program
  .command('download')
  .argument('<filename>', 'name of file being downloaded')
  .description('download a file from the cloud')
  .action(commands.download);

program.parse();
