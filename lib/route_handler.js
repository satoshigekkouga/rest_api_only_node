const {_users} = require('./user_routes');

const handlers = {
  notFound : function(data,callback) {
    callback(404,{});
  },
  ping : function(data,callback){
    callback(200,{});
  },
  users : function(data,callback){
    if(_users[data.method]) _users[data.method](data,callback);
    else callback(405,{});
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
