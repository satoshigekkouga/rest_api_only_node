function basicHandler(res,stausCode,headers,payload){
  res.writeHead(statusCode,headers);
  res.write(payload);
  res.end('over and out');
}

const handlers = {
  sample : function(res,payload){
    res.writeHead(200,{'Content-Type' : 'application/json'});
    res.end(JSON.stringify(payload));
  },
  notFound : function(res) {
    res.writeHead(404,{'Content-Type' : 'application/json'});
    res.end(JSON.stringify({}));
  },
  ping : function(res){
    res.writeHead(200,{'Content-Type' : 'application/json'});
    res.end(JSON.stringify({}));
  },
  users : function(res,payload){
    
  }
};

function handleResponse(path,res,payload){
  let handler = handlers[path] || handlers.notFound;
   handler(res,payload);
}

exports.handleResponse = handleResponse;
