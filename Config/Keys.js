//9- Create our module for exports here. Hop over to our server and declare mongoose for database connection . 10-
module.exports = {
    // mongoURI: 'mongodb://toadeznet:tochukwu123456@ds151820.mlab.com:51820/deliverystore',
    mongoURI:'mongodb://Toadeznet:tochukwu123456@cluster0-shard-00-00.fmgcs.mongodb.net:27017,cluster0-shard-00-01.fmgcs.mongodb.net:27017,cluster0-shard-00-02.fmgcs.mongodb.net:27017/deliverystore?ssl=true&replicaSet=atlas-tnulsm-shard-0&authSource=admin&retryWrites=true&w=majority',
  // mongoURI:'mongodb://Toadeznet:tochukwu123456@cluster0.fmgcs.mongodb.net:27017/deliverystore',

    // 36-Create a key for JWT Token. require this  file in users.js to have access to the key 37
    secretOrKey: 'secret'
};
