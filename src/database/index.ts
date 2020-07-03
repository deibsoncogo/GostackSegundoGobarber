import { createConnection } from 'typeorm';

createConnection(); // BUSCA PELO ARQUIVO ormconfig.json

// O createConnection CONSEGUE RECEBER OS DADOS DE CONFIGURACAO DO ormconfig.json
// MAIS ALGUNS COMANDOS PROCURAM PELO ormconfig.json PARA ACESSAR O BANCO DE DADOS
// COM ISSO DEVEMOS SEMPRE CRIAR O ARQUIVO ormconfig.json
