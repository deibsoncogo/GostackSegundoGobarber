import 'reflect-metadata';

import express from 'express';
import rotas from './routes';

import './database';

import UploadConfig from './config/upload';

const app = express();

app.use(express.json());
// PERMITE VISUALIZAR O AVATAR PELO NAVEGADOR DE FORMA ESTATICA
app.use('/arquivos', express.static(UploadConfig.diretorio));
app.use(rotas);

app.listen(3333, () => {
	console.log('SERVIDOR RODANDO NA PORTA 3333');
});
