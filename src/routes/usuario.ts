import { Router } from 'express';
import multer from 'multer';

import UploadConfiguracao from '../config/upload';
import VerificarAutenticacaoMiddleware from '../middlewares/verificarAutenticacao';
import CriarUsuarioServico from '../services/CriarUsuario';

const usuarioRota = Router();
const multerFinal = multer(UploadConfiguracao);

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

// QUANDO QUEREMOS ALTERAR SOMENTE UMA INFROMACAO USAMOS patch
usuarioRota.patch(
	'/avatar',
	// O MIDDLEWARE SERA ATIVADO SOMENTE NESTE METODO
	VerificarAutenticacaoMiddleware,
	// ATIVA A DEPENCIA TIPO MIDDLEWARE PARA LIDAR COM UPLOAD DE ARQUIVOS
	multerFinal.single('imagem'),
	async (request, response) => {
		// RETORNAR AS INFROMACOES DO ARQUIVO
		return response.json(request.file);
	},
);

export default usuarioRota;
