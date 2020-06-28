import { Router } from 'express';

const rota = Router();

rota.post('/usuarios', (request, response) => {
	const { nome, email } = request.body;

	const usuario = {
		nome,
		email,
	};

	return response.json(usuario);
});

export default rota;
