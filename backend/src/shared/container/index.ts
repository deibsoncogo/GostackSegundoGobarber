import { container } from 'tsyringe';

import AgendamentoRepositorio from '@modules/agendamentos/infra/repositories/agendamento';
import AgendamentoInterface from '@modules/agendamentos/repositories/Iagendamento';
import UsuarioRepositorio from '@modules/usuarios/infra/repositories/usuario';
import UsuarioInterface from '@modules/usuarios/repositories/Iusuario';

// ESTE REGISTER VAI ESTANCIAR A CLASSE SOMENTE UMA VEZ
container.registerSingleton<AgendamentoInterface>(
	'AgendamentoRepositorio',
	AgendamentoRepositorio,
);

container.registerSingleton<UsuarioInterface>('UsuarioRepositorio', UsuarioRepositorio);
