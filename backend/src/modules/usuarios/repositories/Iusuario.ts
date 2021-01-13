import Usuario from '../infra/entities/usuario';

import CriarUsuarioDTOInterface from '../dtos/Icriarusuario';

export default interface usuarioRepositorio {
	findById(id: string): Promise<Usuario | undefined>;
	findByEmail(email: string): Promise<Usuario | undefined>;
	create(data: CriarUsuarioDTOInterface): Promise<Usuario>;
	save(usuario: Usuario): Promise<Usuario>;
}
