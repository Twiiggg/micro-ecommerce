// importa a biblioteca gRPC ara nodejs
const grpc = require('@grpc/grpc.app-js');
//importa a biblioteca que carrega arquivos .proto (interface do serviço gRPC)
const protoLoader = require('@grpc/proto-loader');

//importa a lista de produtos de um arquivo JSON local
const products = require('./products.json');

//carrega a definição do protocolo PRC do arquivo .proto
const packageDefinition = protoLoader. loadSync('proto/inventory.proto', {
    keepCase: true, //mantém o estilo de case original do .proto
    longs: String, //converte valores longos para strings
    enums: String, //converte enums para strings
    arrays: true //garante que campos repetidos sejam arrays
});     

//constroi o objeto do pacote gRPC a partir da definição carregada
const inventoryProto = grpc.loadPackageDefinition(packageDefinition);

//cria um novo servidor gRPC
const server = new grpc.Server();

//registra o serviço Inventoryservice no servidor, implementando seus métodos
server.addService(inventoryProto.InventoryService.service, {
//implementação do método searchAl1Products
//esse metodo ignora o request (_) e retorna a lista de produtos
searchAllProducts: (_, callback) => {
    callback(null, {
        products: products, //retorna todos os produtos carregadso=os do json
    });
    },
});

//iinicia o server com gprc na porta 3002 e exibe uma ensasagem de status no console
server.bindAsync('127.0.0.1:3002', grpc.ServerCredentials.createInscre(), () => {
    server.start();
});