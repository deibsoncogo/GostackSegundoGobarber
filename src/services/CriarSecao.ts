import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import GeralErro from '../errors/geral';
import AutenticacaoConfiguracao from '../config/autenticacao';
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
			// METODO UTILIZADO SEM UMA CLASSE PARA LIDAR COM ERROS
			// throw new Error('Email inválido');
			throw new GeralErro('Email inválido', 401);
		}

		// COMPARA UMA SENHA NAO CRIPTOGRAFADA COM UMA SIM
		const senhaValida = await compare(senha, usuario.senha);

		if (!senhaValida) {
			throw new GeralErro('Senha inválida', 401);
		}

		delete usuario.senha;

		// METODO PARA FACILITAR A MANIPULACAO DOS DADOS
		const { segredo, validade } = AutenticacaoConfiguracao.tokenjwt;

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
