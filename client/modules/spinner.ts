const spinners = require('cli-spinners');
const rdl = require("readline");
const intervalMultiplier = 2;  
const successSymbol = '✔';

let spin = (options) => {
    process.stdout.write("\x1B[?25l");
    let index = 0;
    process.stdout.write(options.frames[0] + ' ' + options.loadingText);
    let spinner = options;
    spinner.width = spinner.frames[0].length;
    spinner.id = setInterval(() => {
        let now = options.frames[index];
        if(typeof(now) === "undefined"){
            index = 0;
            now =  options.frames[index];
        }
        rdl.cursorTo(process.stdout, spinner.width);
        rdl.clearLine(process.stdout, -1);
        rdl.cursorTo(process.stdout, 0);
        process.stdout.write(now);
        index = index >=  options.frames.length ? 0 : index + 1;
    }, (options.interval));
    return spinner; 
};

let halt = (spinner, completeText) => {
    rdl.cursorTo(process.stdout, spinner.width);
    rdl.clearLine(process.stdout, -1);
    rdl.cursorTo(process.stdout, 0);
    process.stdout.write(successSymbol);
    console.log();
    clearInterval(spinner.id);
    if(typeof(completeText) !== "undefined" && completeText.length > 0){    
        process.stdout.write(completeText);
    }
};

let start = async (loadingText, completeText, data, executable) => {
   let spinner = spin({ frames: spinners['dots'].frames, interval: spinners['dots'].interval * intervalMultiplier, loadingText: loadingText });
   let results = await executable(data).then((results) => {
    halt(spinner, completeText);
    return results;
   });
   return results;
};

module.exports = {
    start: start
};