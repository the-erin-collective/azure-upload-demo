const { Command } = require('commander');
const program = new Command();

program
  .name('files-in-cloud')
  .description('Access cloud file storage')
  .version('0.0.0');

program.command('help')
  .description('show help for a command')
  .argument('string', 'command name')
  .action((commandName) => {
    console.log(commandName);
  });

program.parse();