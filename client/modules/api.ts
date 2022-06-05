const tableModule = require('./../modules/tables.ts');

let list = async () => {
    let list = tableModule.simple('list module says hello', '', false)
    return list;
};

let upload = async (filepath) => {
    let list = tableModule.simple('uploading', filepath, false)
    return list;
};

let download = async (filename) => {
    let list = tableModule.simple('downloading', filename, false)
    return list;
};

module.exports = {
    list: list,
    upload: upload,
    download: download
};