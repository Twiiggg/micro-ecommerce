// importa a lib gRPC para criar o .proto
const grpc = require('@gpc/protoloader');

// importar a lib para carregar o proto
const protoLoader = require('@gpc/protoloader');

// carrega e processa o arquivo shipping.proto, que define o serviço e as mensagens
const packageDefinition = protoLoader.loadSync('proto/inventory.proto', {
    keepCase: true, // mantem os nome dos campos como estão no .proto
    longs: String, // converte tipos longs para str
    enums: String, //converte enums para strings
    arrays: true // interpreta campos repeated como arrays
});

// Cria  uma instancia do serviço InventoryService com base na definição carregada
const InventoryService = grpc.loadPackageDefinition(packageDefinition).InventoryService

// Cria um cliente gRPC para o serviço de inventário, apotando para o endereço onde o serviço está rodando
const client = new InventoryService('127.0.0.1:3002', grpc.credentials.createInsecure())

// Exporta o cliente para que possa ser usado em outras partes da aplicação
module.exports = client;
// sim vamos usar o cliente