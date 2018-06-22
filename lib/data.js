const fs = require('fs');
const path = require('path');

let lib = {};

lib.create = function(dir,file,data,callback){
  let pathToFile = path.join(__dirname,'/../.data',dir,file) + '.json';
  data = JSON.stringify(data);
  fs.writeFile(pathToFile,data,{flag:'wx'},callback);
};

lib.read = function(dir,file,callback){
  let pathToFile = path.join(__dirname,'/../.data',dir,file) + '.json';
  fs.readFile(pathToFile,'utf8',callback);
};

lib.update = function(dir,file,data,callback){
  let pathToFile = path.join(__dirname,'/../.data',dir,file) + '.json';
  data = JSON.stringify(data);
  if(fs.existsSync(pathToFile)){
    fs.writeFile(pathToFile,data,{flag:'w'},callback);
  }else{
    throw new Error('No such file exists');
  }
};

lib.delete = function(dir,file,callback){
  let pathToFile = path.join(__dirname,'/../.data',dir,file) + '.json';
  fs.unlink(pathToFile,callback);
}

exports._data = lib;
