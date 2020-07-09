import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import GeralErro from '../errors/geral';
import UploadConfiguracao from '../config/upload';
import UsuarioModelo from '../models/usuario';

interface Request {
	usuario_id: string;
	imagemAvatar: string;
}

export default class CriarAvatar {
	public async execute({ usuario_id, imagemAvatar }: Request): Promise<UsuarioModelo> {
		const usuarioRepositorio = getRepository(UsuarioModelo);

		// VERIFICA SE EXISTE O ID NO BANCO DE DADOS
		const usuario = await usuarioRepositorio.findOne(usuario_id);

		if (!usuario) {
			throw new GeralErro('Usuario informado não encontrado', 401);
		}

		// VERIFICA SE EXISTE UMA INFORMACAO NA COLUNA AVATAR
		if (usuario.avatar) {
			// CONCATENA DUAS INFORMACOES CRIANDO O CAMINHO DO ARQUIVO
			const caminhoArquivoSalvo = path.join(UploadConfiguracao.diretorio, usuario.avatar);
			// VERIFICA O STATUS DE UM ARQUIVO EXISTENTE O stat
			// FORCA A UTILIZACAO DE UM Promise O COMANDO fs.promises
			const verificarExistenciaArquivo = await fs.promises.stat(caminhoArquivoSalvo);

			// FAZ A EXCLUSAO O ARQUIVO O unlink
			if (verificarExistenciaArquivo) {
				await fs.promises.unlink(caminhoArquivoSalvo);
			}
		}

		delete usuario.senha;

		// ENVIA A INFORMA NOVA PARA O BANCO DE DADOS
		usuario.avatar = imagemAvatar;

		// SALVA AS ALTERCOES DO BANCO DE DADOS
		await usuarioRepositorio.save(usuario);

		return usuario;
	}
}
