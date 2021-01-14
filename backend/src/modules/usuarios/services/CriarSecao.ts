import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import UsuarioModelo from '../infra/entities/usuario';
import UsuarioInterfaceRepositorio from '../repositories/Iusuario';

import AutenticacaoConfiguracao from '@config/autenticacao';
import GeralErro from '@shared/errors/geral';

interface Request {
	email: string;
	senha: string;
}

interface Response {
	usuario: UsuarioModelo;
	token: string;
}

@injectable()
export default class CriarSecao {
	constructor(
		@inject('UsuarioRepositorio')
		private usuarioRepositorio: UsuarioInterfaceRepositorio,
	) {}

	public async execute({ email, senha }: Request): Promise<Response> {
		// const secaoRepositorio = getRepository(UsuarioModelo);

		// RETORNAR TODOS AS INFORMACOES DO USUARIO TAMBEM
		// VERIFICA SE EXISTE O EMAIL CADASTRADO
		const usuario = await this.usuarioRepositorio.findByEmail(email);

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

		// delete usuario.senha;

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
