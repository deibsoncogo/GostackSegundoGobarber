import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CriarUsuarioServico from '@modules/usuarios/services/CriarUsuario';

export default class UsuarioController {
	public async criar(request: Request, response: Response): Promise<Response> {
		// RECEBE AS INFORMACOES RECEBIDA
		const { nome, email, senha } = request.body;

		// CRIA UMA INSTANCIA PARA PODER USTILIZAR O COMANDOS DO ARQUIVO
		const criarUsuario = container.resolve(CriarUsuarioServico);

		// ENVIA AS INFORMACOES PARA O ARQUIVO INSTANCIADO
		const usuario = await criarUsuario.execute({
			nome,
			email,
			senha,
		});

		// delete usuario.senha;

		// ENVIA PARA O USUARIO O RESUTLADO DA EXECUCAO DESTA ROTA
		return response.json(usuario);
	}
}
