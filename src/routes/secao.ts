import { Router } from 'express';

import CriarSecaoServico from '../services/CriarSecao';

const secaoRota = Router();

secaoRota.post('/', async (request, response) => {
	try {
		const { email, senha } = request.body;

		const criarSecao = new CriarSecaoServico();

		const { usuario, token } = await criarSecao.execute({
			email,
			senha,
		});

		return response.json({ usuario, token });
	} catch (err) {
		// METODO UTILIZADO SEM UMA CLASSE PARA LIDAR COM ERROS
		// return response.status(400).json({ error: err.message });
		return response.status(err.status).json({ erro: err.mensagem });
	}
});

export default secaoRota;
