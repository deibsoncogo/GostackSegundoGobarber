import express from 'express';

import rotas from './routes';

import './database';

const app = express();

app.use(express.json());

app.use(rotas);

app.listen(3333, () => {
	console.log('SERVIDOR RODANDO NA PORTA 3333');
});
