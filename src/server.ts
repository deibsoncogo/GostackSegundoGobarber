import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import rotas from './routes';

import './database';

import GeralErro from './errors/geral';
import UploadConfig from './config/upload';

const app = express();

app.use(
	cors({
		// DEFINE QUAL ENDERECO PODE ACESSAR ESTE BACKEND
		// origin: 'http://localhost:3333',
	}),
);

// FAZ O EXPRESS ENTERDE O JSON
app.use(express.json());

// PERMITE VISUALIZAR O AVATAR PELO NAVEGADOR DE FORMA ESTATICA
app.use('/arquivos', express.static(UploadConfig.diretorio));

// AS ROTAS DA API
app.use(rotas);

// FAZ A TRATATIVA DE ERROS
app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
	// VERIFICA SE E UM ERRO GERANDO PELA INSTANCIA DA API
	if (err instanceof GeralErro) {
		return response.status(err.status).json({
			status: 'Erro',
			message: err.mensagem,
		});
	}

	console.log(err);

	return response.status(500).json({
		status: 'Erro',
		message: 'Erro interno do servidor',
	});
});

// PORTA PARA RODAR A API
app.listen(3333, () => {
	console.log('SERVIDOR RODANDO NA PORTA 3333');
});
