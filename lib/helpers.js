const crypto = require('crypto');

let _helpers = {};

_helpers.hash = function(str){
  return crypto.createHmac('sha256','a secret').update(str).digest('hex');
};


exports._helpers = _helpers;
