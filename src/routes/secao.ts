import { Router } from 'express';

import CriarSecaoServico from '../services/CriarSecao';

const secaoRota = Router();

secaoRota.post('/', async (request, response) => {
	try {
		const { email, senha } = request.body;

		const criarSecao = new CriarSecaoServico();

		const { emailValido } = await criarSecao.execute({
			email,
			senha,
		});

		return response.json({ emailValido });
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

export default secaoRota;
