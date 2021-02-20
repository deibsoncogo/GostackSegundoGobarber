import { Router } from 'express';
import multer from 'multer';

import UploadConfiguracao from '@config/upload';
import VerificarAutenticacaoMiddleware from '@shared/infra/middlewares/verificarAutenticacao';

import AvatarController from '../controllers/avatarController';
import UsuarioController from '../controllers/usuarioController';

const usuarioRota = Router();
const usuarioController = new UsuarioController();
const avatarController = new AvatarController();
const multerFinal = multer(UploadConfiguracao);

usuarioRota.post('/', usuarioController.criar);

// QUANDO QUEREMOS ALTERAR SOMENTE UMA INFROMACAO USAMOS patch
usuarioRota.patch(
	'/avatar',
	// O MIDDLEWARE SERA ATIVADO SOMENTE NESTE METODO
	VerificarAutenticacaoMiddleware,
	// ATIVA A DEPENCIA TIPO MIDDLEWARE PARA LIDAR COM UPLOAD DE UM ARQUIVO
	multerFinal.single('imagem'),
	avatarController.atualizar,
);

export default usuarioRota;
