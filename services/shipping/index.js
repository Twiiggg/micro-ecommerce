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

// carrega o pacote grpc com base an definição
const shipping = grpc.loadPackageDefinition(packageDefinition);

// cria uma nova instancia do server de grpc
const server = new grpc.Server();

// adiciona o serviço ShippingService ao servidor, implementando o metodo GetShippingRate
server.addService(shippingProto.Shipping.service, {
    // implementação da função GetShippingRAte
    // Simula um valor de frete gerando um numero aleatorio entre 1 a 100
    GetShippingRate: (_callback) => {
        const shippingValue = Math.random * 100 + 1;

        //retorna o valor do frete ao cliente via callback
        callback(null, {
            value: shippingValue,
        });
    },
});

// define a porta e endereço onde o servidor grpc ficará escutnado (0.0.0.0 permite conexões externas)
server.bindAsync('0.0.0.0:3001', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Shipping Service running at http:127.0.0.1:3001');
    server.start(); // inicia o servidor
});