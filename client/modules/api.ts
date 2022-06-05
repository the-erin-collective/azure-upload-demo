const https = require('https');
const axios = require('axios').default;
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

let list = async () => {
    let list = await axios({
        method: 'post',
        url: config.apiurl + '/listall',
        data: {}, 
        httpsAgent: new https.Agent({  
            rejectUnauthorized: false
        }),
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': 0,
            'Accept': 'application/json'
        }
      }).then((response) => {
            return response.data;
      }).catch((error) => {
            console.log();
            console.log(error);
            throw error;
        });
    return list;
};

let upload = async (filepath) => {
    return 'uploading ' + filepath;
};

let download = async (filename) => {
    return 'downloading' + filename;
};

module.exports = {
    list: list,
    upload: upload,
    download: download
};