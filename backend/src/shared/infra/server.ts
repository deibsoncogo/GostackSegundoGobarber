import '@shared/infra/database';
import '@shared/container';
import 'express-async-errors';
import 'reflect-metadata';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import rotas from './routes';

import UploadConfig from '@config/upload';
import GeralErro from '@shared/errors/geral';

const app = express();

app.use(cors());

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
		message: 'ERRO INTERNO DO SERVIDOR',
	});
});

// PORTA PARA RODAR A API
app.listen(3333, () => {
	console.log('SERVIDOR RODANDO NA PORTA 3333');
});
