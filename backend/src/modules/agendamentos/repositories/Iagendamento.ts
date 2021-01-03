import AgendamentoEntiti from '../infra/entities/agendamento';

import CriarAgendamentoInterfaceDTO from '../dtos/Icriaragendamento';

export default interface AgendamentoInterface {
	create(data: CriarAgendamentoInterfaceDTO): Promise<AgendamentoEntiti>;
	buscaHorario(date: Date): Promise<AgendamentoEntiti | undefined>;
}

// QUANDO UM ARQUIVO INICIAR COM A LETRA I QUER DIZER QUE ELE RETORNA SOMENTE INTERFACES
