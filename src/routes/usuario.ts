import { Router } from 'express';

import CriarUsuarioServico from '../services/CriarUsuario';

const usuarioRota = Router();

usuarioRota.post('/', async (request, response) => {
	try {
		// RECEBE AS INFORMACOES RECEBIDA
		const { nome, email, senha } = request.body;

		// CRIA UMA INSTANCIA PARA PODER USTILIZAR O COMANDOS DO ARQUIVO
		const criarUsuario = new CriarUsuarioServico();

		// ENVIA AS INFORMACOES PARA O ARQUIVO INSTANCIADO
		const usuario = await criarUsuario.execute({
			nome,
			email,
			senha,
		});

		// ENVIA PARA O USUARIO O RESUTLADO DA EXECUCAO DESTA ROTA
		return response.json(usuario);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

export default usuarioRota;
