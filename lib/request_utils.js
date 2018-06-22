const url = require('url');
const {StringDecoder} = require('string_decoder');
const {handleResponse} = require('./route_handler.js');

const decoder = new StringDecoder('utf8');

function req_preProcessing(req){
    let path = url.parse(req.url,true);
    let trimmedPath = path.pathname.replace(/\/+|\/+$/,'');
    let queries = path.query;
    let headers = req.headers;
    let method = req.method;
    let buffer = '';
    return {trimmedPath,queries,headers,method,buffer};
}

function req_processing(req,res){
  let data = req_preProcessing(req);
  req.on('data',chunk => {
    data.buffer += decoder.write(chunk);
  });
  req.on('end',chunk => {
    data.buffer += decoder.end(chunk);
    console.log(data);
    handleResponse(data,res);
  });
}

exports.req_processing = req_processing;
