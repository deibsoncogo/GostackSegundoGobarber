import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CriarSecaoServico from '@modules/usuarios/services/CriarSecao';

export default class SecaoController {
	public async criar(request: Request, response: Response): Promise<Response> {
		// BUSCA PELO TIPO DE ACAO DO throw (Error)
		// try {
		const { email, senha } = request.body;

		const criarSecao = container.resolve(CriarSecaoServico);

		const { usuario, token } = await criarSecao.execute({
			email,
			senha,
		});

		// delete usuario.senha;

		return response.json({ usuario, token });
		// AO ENCONTRAR O TIPO INFORMADO (err) EXECUTA O COMANDO ABAIXO
		// } catch (err) {
		// METODO UTILIZADO SEM UMA CLASSE PARA LIDAR COM ERROS
		// return response.status(400).json({ error: err.message });
		// return response.status(err.status).json({ erro: err.mensagem });
		// }
	}
}
