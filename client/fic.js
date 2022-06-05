var Command = require('commander').Command;
var tables = require('./modules/tables.ts');
var help = require('./modules/help.ts');
var programName = 'fic';
var program = new Command();
program
    .name(programName)
    .description('Access cloud file storage')
    .version('0.0.0')
    .usage('[options] [command]')
    .action(function (arg, cmd, command) {
    console.log();
    console.log('Unrecognized command, try one of these...');
    program.help();
});
program.configureHelp({
    formatHelp: function (cmd, helper, command) {
        var header = '';
        if (cmd._name === programName) {
            header = 'Unrecognized command, try one of these...';
        }
        return tables.simple(header, help.formatHelp(cmd, helper));
    }
});
program
    .command('list')
    .description('list files in the cloud')
    .action(function (arg, options, command) {
    console.log('action');
});
program.parse();
