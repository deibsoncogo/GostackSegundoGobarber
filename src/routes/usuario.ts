import { Router } from 'express';
import multer from 'multer';

import CriarAvatarServico from '../services/CriarAvatar';
import CriarUsuarioServico from '../services/CriarUsuario';

import UploadConfiguracao from '../config/upload';
import VerificarAutenticacaoMiddleware from '../middlewares/verificarAutenticacao';

const usuarioRota = Router();
const multerFinal = multer(UploadConfiguracao);

usuarioRota.post('/', async (request, response) => {
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
});

// QUANDO QUEREMOS ALTERAR SOMENTE UMA INFROMACAO USAMOS patch
usuarioRota.patch(
	'/avatar',
	// O MIDDLEWARE SERA ATIVADO SOMENTE NESTE METODO
	VerificarAutenticacaoMiddleware,
	// ATIVA A DEPENCIA TIPO MIDDLEWARE PARA LIDAR COM UPLOAD DE UM ARQUIVO
	multerFinal.single('imagem'),
	async (request, response) => {
		const criarAvatarServico = new CriarAvatarServico();

		const usuario = await criarAvatarServico.execute({
			usuario_id: request.usuario.id,
			imagemAvatar: request.file.filename,
		});

		// RETORNAR AS INFROMACOES DO ARQUIVO
		return response.json([usuario, request.file]);
	},
);

export default usuarioRota;
