import CriarUsuarioInterfaceDTO from '@modules/usuarios/dtos/Icriarusuario';
import { getRepository, Repository } from 'typeorm';

import UsuarioEntidade from '../entities/usuario';
import UsuarioIntefaceRepositorio from '@modules/usuarios/repositories/Iusuario';

class Usuario implements UsuarioIntefaceRepositorio {
	private ORMRepositorio: Repository<UsuarioEntidade>;

	constructor() {
		this.ORMRepositorio = getRepository(UsuarioEntidade);
	}

	public async findById(id: string): Promise<UsuarioEntidade | undefined> {
		const usuario = await this.ORMRepositorio.findOne(id);

		return usuario;
	}

	public async findByEmail(email: string): Promise<UsuarioEntidade | undefined> {
		const usuario = await this.ORMRepositorio.findOne({
			where: { email },
		});

		return usuario;
	}

	public async create(usuarioData: CriarUsuarioInterfaceDTO): Promise<UsuarioEntidade> {
		const usuario = this.ORMRepositorio.create(usuarioData);

		await this.ORMRepositorio.save(usuario);

		return usuario;
	}

	public async save(usuario: UsuarioEntidade): Promise<UsuarioEntidade> {
		return this.ORMRepositorio.save(usuario);
	}
}

export default Usuario;
