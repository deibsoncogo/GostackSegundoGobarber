import { Router } from 'express';

import UsuarioRepositorio from '@modules/usuarios/infra/repositories/usuario';
import CriarSecaoServico from '@modules/usuarios/services/CriarSecao';

const secaoRota = Router();

secaoRota.post('/', async (request, response) => {
	// BUSCA PELO TIPO DE ACAO DO throw (Error)
	// try {
	const { email, senha } = request.body;

	const usuarioRepositorio = new UsuarioRepositorio();
	const criarSecao = new CriarSecaoServico(usuarioRepositorio);

	const { usuario, token } = await criarSecao.execute({
		email,
		senha,
	});

	return response.json({ usuario, token });
	// AO ENCONTRAR O TIPO INFORMADO (err) EXECUTA O COMANDO ABAIXO
	// } catch (err) {
	// METODO UTILIZADO SEM UMA CLASSE PARA LIDAR COM ERROS
	// return response.status(400).json({ error: err.message });
	// return response.status(err.status).json({ erro: err.mensagem });
	// }
});

export default secaoRota;
