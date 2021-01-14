import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import UsuarioModelo from '../infra/entities/usuario';
import UsuarioInterfaceRepositorio from '../repositories/Iusuario';

import GeralErro from '@shared/errors/geral';

interface Request {
	nome: string;
	email: string;
	senha: string;
}
// TAMBEM PODEMOS EXPORTAR ASSIM
@injectable()
export default class CriarUsuario {
	constructor(
		@inject('UsuarioRepositorio')
		private usuarioRepositorio: UsuarioInterfaceRepositorio,
	) {}

	public async execute({ nome, email, senha }: Request): Promise<UsuarioModelo> {
		// NESCESSARIO PARA PODER USTILIZAR A DEPENDENCIA
		// const usuarioRepositorio = getRepository(UsuarioModelo);

		// TENTA LOCALIZAR ESTE EMAIL NO BANCO DE DADOS
		const emailDuplicado = await this.usuarioRepositorio.findByEmail(email);

		// SE ACHAR ESTE EMAIL NO BANCO DE DADOS EXECUTAR O COMANDO DE ERRO
		if (emailDuplicado) {
			throw new GeralErro('Email já cadastrado', 400);
		}

		// CRIA UMA CRIPTOGRAFIA DE TAMANHO 4
		const criptografarSenha = await hash(senha, 4);

		// CRIA ESTAS INFORMACOES NO BANCO DE DADOS
		const usuario = await this.usuarioRepositorio.create({
			nome,
			email,
			senha: criptografarSenha, // SUBSTITUI A SENHA PARA A CRIPTOGRAFADA
		});

		// SALVA AS ALTERACOES QUE EXISTE NO BANCO DE DADOS
		// await usuarioRepositorio.save(usuario);

		// REMOVE A INFORMACAO SENHA PARA O RETORNO DO USUARIO
		// delete usuario.senha;

		// RETORNA AS INFORMACOES PARA A ROTA
		return usuario;
	}
}
