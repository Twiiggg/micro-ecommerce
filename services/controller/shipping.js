// importa a lib gRPC para criar o .proto
const grpc = require('@gpc/protoloader');

// importar a lib para carregar o proto
const protoLoader = require('@gpc/protoloader');

// carrega e processa o arquivo shipping.proto, que define o serviço e as mensagens
const packageDefinition = protoLoader.loadSync('proto/shipping.proto', {
    keepCase: true, // mantem os nome dos campos como estão no .proto
    longs: String, // converte tipos longs para str
    enums: String, //converte enums para strings
    arrays: true // interpreta campos repeated como arrays
});

// Cria o cliente gRPC a partir da definição de serviço carregada
const ShippingService = grpc.loadpackageDefinition(packageDefinition).ShippingService;

// Instancia o cliente gRPC conectado ao serviço de frete na porta 3001
const client = new ShippingService('127.0.0.1:3001', grpc.credentials.createInsecure());