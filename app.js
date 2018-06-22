const http = require('http');
const {req_processing} = require('./lib/request_utils.js');

const server = http.createServer(req_processing);

server.listen(8000,() => {
  console.log('listening at port 8000');
});

server.on('error',(err) => {
  console.log(err);
});
