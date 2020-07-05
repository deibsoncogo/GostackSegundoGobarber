import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import UsuarioModelo from '../models/usuario';

interface Request {
	email: string;
	senha: string;
}

interface Response {
	usuario: UsuarioModelo;
	token: string;
}

export default class CriarSecao {
	public async execute({ email, senha }: Request): Promise<Response> {
		const secaoRepositorio = getRepository(UsuarioModelo);

		// RETORNAR TODOS AS INFORMACOES DO USUARIO TAMBEM
		// VERIFICA SE EXISTE O EMAIL CADASTRADO
		const usuario = await secaoRepositorio.findOne({
			where: { email },
		});

		if (!usuario) {
			throw new Error('Email inválido');
		}

		// COMPARA UMA SENHA CRIPTOGRAFADA COM UMA NAO
		const senhaValida = await compare(senha, usuario.senha);

		if (!senhaValida) {
			throw new Error('Senha inválida');
		}

		delete usuario.senha;

		// PRECISAMOS INFORMAR UMA SENHA PARA O TOKEN
		const token = sign({}, 'ad9fe8bfaa77d9808d582fe2eaa29262', {
			subject: usuario.id, // ID DO USUARIO
			expiresIn: '10d', // TEMPO DE VALIDADE DO TOKEN
		});

		return {
			usuario,
			token,
		};
	}
}
