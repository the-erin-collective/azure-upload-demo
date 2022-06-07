const Table = require('tty-table');

let simpleDefaults = {
    borderStyle: "solid",
    borderColor: "black",
    headerAlign: "left",
    headerColor: "grey",
    align: "left",
    color: "whiteBright",
    paddingBottom: 0,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 0
};

let simple = (title, body, breakAfter) => {
    const headers = [{
        value: "",
        alias: title,
    }];
    const rows = [{
        text: body
    }];
    let table = Table(headers, rows, simpleDefaults).render();
    return table + (breakAfter ? '\n\n' : '');
};

let spreadsheet = (titleProps, data, breakAfter) => {
    let headers = [];
    let rows = [];
    titleProps.forEach((title) => {
        headers.push({
            value: title.value,
            alias: title.alias
          });
    });
    data.forEach(item => {
        let row = { };
        titleProps.forEach((title) => {
            row[title.value] = normalizeToString(item[title.value]);
        });
        rows.push(row);
    });
    let table = Table(headers, rows, simpleDefaults).render();
    return table + (breakAfter ? '\n\n' : '');
};

let normalizeToString = (strCandidate) => {
    return '' + strCandidate;
};

module.exports = {
    simple: simple,
    spreadsheet: spreadsheet
};

// declare type Formatter {
//     (cellValue: any, columnIndex: number, rowIndex: number, rowData: any, inputData: any): string;
// };

// declare type SimpleDefaults {
//     borderStyle?: BorderStyle;
//     borderColor?: ForegroundColor;
//     headerAlign?: Alignment;
//     headerColor?: ForegroundColor;
//     align?: Alignment;
//     color?: ForegroundColor;
//     paddingBottom?: number;
//     paddingLeft?: number;
//     paddingRight?: number;
//     paddingTop?: number;
//     footerColor?: ForegroundColor;
//     footerAlign?: string;
//     formatter?: Formatter;
//     marginLeft?: number;
//     marginTop?: number;
//     width?: string | number;
// };

// declare type BorderStyle = 
//     | 'none'
//     | 'solid'
//     | 'dashed';

// declare type Alignment =
// 	| 'left'
// 	| 'right'
// 	| 'center';

// declare type ForegroundColor =
// 	| 'black'
// 	| 'red'
// 	| 'green'
// 	| 'yellow'
// 	| 'blue'
// 	| 'magenta'
// 	| 'cyan'
// 	| 'white'
// 	| 'gray'
// 	| 'grey'
// 	| 'blackBright'
// 	| 'redBright'
// 	| 'greenBright'
// 	| 'yellowBright'
// 	| 'blueBright'
// 	| 'magentaBright'
// 	| 'cyanBright'
// 	| 'whiteBright';

// declare type BackgroundColor =
// 	| 'bgBlack'
// 	| 'bgRed'
// 	| 'bgGreen'
// 	| 'bgYellow'
// 	| 'bgBlue'
// 	| 'bgMagenta'
// 	| 'bgCyan'
// 	| 'bgWhite'
// 	| 'bgGray'
// 	| 'bgGrey'
// 	| 'bgBlackBright'
// 	| 'bgRedBright'
// 	| 'bgGreenBright'
// 	| 'bgYellowBright'
// 	| 'bgBlueBright'
// 	| 'bgMagentaBright'
// 	| 'bgCyanBright'
// 	| 'bgWhiteBright';
