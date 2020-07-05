import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import UsuarioModelo from '../models/usuario';

interface Request {
	email: string;
	senha: string;
}

interface Response {
	emailValido: UsuarioModelo;
}

export default class CriarSecao {
	public async execute({ email, senha }: Request): Promise<Response> {
		const secaoRepositorio = getRepository(UsuarioModelo);

		// RETORNAR TODOS AS INFORMACOES DO USUARIO TAMBEM
		const emailValido = await secaoRepositorio.findOne({
			where: { email },
		});

		if (!emailValido) {
			throw new Error('Email inválido');
		}

		// COMPARA UMA SENHA CRIPTOGRAFADA COM UMA NAO
		const senhaValida = await compare(senha, emailValido.senha);

		if (!senhaValida) {
			throw new Error('Senha inválida');
		}

		delete emailValido.senha;

		return {
			emailValido,
		};
	}
}
