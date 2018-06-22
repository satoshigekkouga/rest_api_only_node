const {_helpers} = require('./helpers');
const {_data} = require('./data');

let users = {};

function validateData(data,callback){
  try{
    let payload = JSON.parse(data.buffer);
    let firstName = payload.firstName.trim() || false;
    let lastName = payload.lastName.trim() || false;
    let phone = payload.phone.trim() || false;
    let password = payload.password.trim() || false;
    if(!(firstName && lastName && phone && password)) throw new Error();
    else return {firstName,lastName,phone,password};
  }
  catch(e){
    callback(400,{cause : 'Invalid or incomplete input'});
  }
}

users.post = function(data,callback){
  let userInfo = validateData(data,callback);
  if(userInfo){
    userInfo.hashedPassword = _helpers.hash(userInfo.password);
    delete userInfo.password;
    _data.create('users',userInfo.phone,userInfo,function(err){
      if(err) callback(400,err);
      else callback(200,{});
    })
   }
  else return;
};

users.get = function(data,callback){
  _data.read('users',data.queries.phone,function(err,fileData){
    if(err) callback(500,{error:'unable to retrieve file'});
    else {
      fileData = JSON.parse(fileData);
      if(fileData.hashedPassword === _helpers.hash(data.queries.password)){
        callback(200,fileData);
      }
      else callback(400,{error:"incorrect password"});
    }
  });
};

users.put = function(){

};

users.delete = function(data,callback){
  _data.read('users',data.queries.phone,function(err,fileData){
    if(err) callback(500,{error:'unable to retrieve file'});
    else {
      fileData = JSON.parse(fileData);
      if(fileData.hashedPassword === _helpers.hash(data.queries.password)){
        _data.delete('users',data.queries.phone,function(err){
          if(err) callback(500,err);
          else callback(200,{});
        });
      }
      else callback(400,{error:"incorrect password"});
    }
  });
};

exports._users = users;
