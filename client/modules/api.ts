const https = require('https');
const axios = require('axios').default;
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const axiosFormData = require('axios-form-data');

axios.interceptors.request.use(axiosFormData);

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const validFileExtentions = ['.png', '.gif', '.jpgeg', '.jpg', '.webp', '.svg', '.bmp'];

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
    let fullpath = path.join(__dirname + '/..' + filepath);
    let exists = await fs.promises.access(fullpath)
        .then(() => {
            return true;
        })
        .catch((err) => {
           return false;
        });
    if(!exists){
        throw ('"' + fullpath + '" does not reference an existing file');
    }
    let stats = getFileStats(fullpath);
    if(!stats.isFile()){
        throw ('"' + fullpath + '" does not reference a file');
    }
    let pathInfo = path.parse(fullpath);
    if(validFileExtentions.indexOf(pathInfo.ext) < 0){
        throw ('only the following image formats are supported: ' + validFileExtentions.join(' '));
    }

    let doc = {
        dateCreated: stats.ctime,
        dateLastModified: stats.mtime,
        contentLength: stats.size,
        filename: pathInfo.name + pathInfo.ext
    };

    let result = await axios({
        method: 'post',
        url: config.apiurl + '/upload',
        data: {
            document: doc,
            imageFile: fs.createReadStream(fullpath)
            },
        httpsAgent: new https.Agent({  
            rejectUnauthorized: false
        }),
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }
      }).then((response) => {
            return response.data;
      }).catch((error) => {
            console.log();
            console.log(error);
            throw error;
      });

    return result;
};

let download = async (filename) => {
    return 'downloading' + filename;
};

let getFileStats = (filename) => {
    return fs.statSync(filename);
}

module.exports = {
    list: list,
    upload: upload,
    download: download
};