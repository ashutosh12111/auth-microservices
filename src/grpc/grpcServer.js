const grpc = require("@grpc/grpc-js");
const protoLoader = require('@grpc/proto-loader');
const path =require("path");
const authController = require("../controllers/authController");
const { Server } = require("http");

const PROTO_PATH = path.join(__dirname,'..',"protos", "auth.proto")
const packageDefinition = protoLoader.loadSync(PROTO_PATH,{
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const authService = grpc.loadPackageDefinition(packageDefinition).auth.AuthService;


function register(call, callback){
    authController.register(call.request, callback)
}

function login(call, callback) {
    authController.login(call.request, callback);
  }

function verifyToken(call, callback){
  authController.verifyToken(call.request,callback)
}

  function getServer(){
    const server = new grpc.Server();
    server.addService(authService.service,{
        Register:register,
        Login:login , // funtions ,
        verifyToken:verifyToken
    }) 
    return server
  }

  if (require.main === module) {
    const server = getServer();
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
      console.log(`Server running at http://0.0.0.0:${port}`);
      // server.start()
    });
  }
  
  module.exports = getServer;