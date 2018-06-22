const _users = require('./user_routes');

const handlers = {
  notFound : function(data,callback) {
    callback(404,{});
  },
  ping : function(data,callback){
    callback(200,{});
  },
  users : function(data,callback){

  }
};

function handleResponse(data,res){
  let handler = handlers[data.trimmedPath] || handlers.notFound;
   handler(data,function(statusCode,message){
     res.writeHead(statusCode,{'Content-Type' : 'application/json'});
     res.write(JSON.stringify(message));
     res.end();
   });
}

exports.handleResponse = handleResponse;
