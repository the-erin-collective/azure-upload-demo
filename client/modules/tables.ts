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

module.exports = {
    simple: simple
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
