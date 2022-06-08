const spinners = require('cli-spinners');
const rdl = require("readline");
const _intervalMultiplier = 2;  
const _successSymbol = '✔';
const _failureymbol = '❌';
const _minimumSpinnerWidth = 2;

let spin = (options) => {
    process.stdout.write("\x1B[?25l");
    let index = 0;
    let padding = ' ';
    let spinner = options;
    let firstFrame = spinner.frames[0];
    spinner.width = firstFrame.length;
    if(spinner.width < _minimumSpinnerWidth){
        spinner.width = _minimumSpinnerWidth;
        for(var i = _minimumSpinnerWidth; i >= firstFrame.length; i--){
            padding += ' ';
        }
    } 
    process.stdout.write(firstFrame + padding + options.loadingText);
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
        index = index >= options.frames.length ? 0 : index + 1;
    }, (options.interval));
    return spinner; 
};

let halt = (spinner, completeText, isError = false) => {
    let resultSymbol = isError ? _failureymbol : _successSymbol;
    rdl.cursorTo(process.stdout, spinner.width);
    rdl.clearLine(process.stdout, -1);
    rdl.cursorTo(process.stdout, 0);
    process.stdout.write(resultSymbol);
    
    clearInterval(spinner.id);  
    console.log();

    if(!isError){
        if(typeof(completeText) !== "undefined" && completeText.length > 0){    
            process.stdout.write(completeText);
        }
        console.log();
    } 
};

let start = async (loadingText, completeText, failureText, resultValidation, data, executable) => {
   let spinner = spin({ frames: spinners['dots'].frames, interval: spinners['dots'].interval * _intervalMultiplier, loadingText: loadingText });
   let results = await executable(data).then((results) => {
        let resultModelIsValid = resultValidation(results);
       
        halt(spinner, completeText, !resultModelIsValid);
       
        if(!resultModelIsValid){
            results.data = null;
            if(!(results.errorMessage) || results.errorMessage.length === 0){
                results.errorMessage = failureText;
                results.data = null;
            }
        }
        return results;
   }).catch(err => {
        halt(spinner, err, true);
        throw(err);
   });
   return results;
};

module.exports = {
    start: start
};