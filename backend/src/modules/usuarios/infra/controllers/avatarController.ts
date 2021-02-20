import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CriarAvatarServico from '@modules/usuarios/services/CriarAvatar';

export default class UsuarioController {
	public async atualizar(request: Request, response: Response): Promise<Response> {
		const criarAvatarServico = container.resolve(CriarAvatarServico);

		const usuario = await criarAvatarServico.execute({
			usuario_id: request.usuario.id,
			imagemAvatar: request.file.filename,
		});

		// delete usuario.senha;

		// RETORNAR AS INFROMACOES DO ARQUIVO
		return response.json([usuario, request.file]);
	}
}
