import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import TokenConfiguracao from '../config/token';
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

		// COMPARA UMA SENHA NAO CRIPTOGRAFADA COM UMA SIM
		const senhaValida = await compare(senha, usuario.senha);

		if (!senhaValida) {
			throw new Error('Senha inválida');
		}

		delete usuario.senha;

		// METODO PARA FACILITAR A MANIPULACAO DOS DADOS
		const { segredo, validade } = TokenConfiguracao.create;

		// PRECISAMOS INFORMAR UMA SENHA PARA O TOKEN
		const token = sign({}, segredo, {
			subject: usuario.id, // ID DO USUARIO
			expiresIn: validade, // TEMPO DE VALIDADE DO TOKEN
		});

		return {
			usuario,
			token,
		};
	}
}
