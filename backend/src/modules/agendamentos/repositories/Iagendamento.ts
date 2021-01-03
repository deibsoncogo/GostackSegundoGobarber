import AgendamentoEntiti from '../infra/entities/agendamento';

export default interface AgendamentoInterface {
	buscaHorario(date: Date): Promise<AgendamentoEntiti | undefined>;
}

// QUANDO UM ARQUIVO INICIAR COM A LETRA I QUER DIZER QUE ELE RETORNA SOMENTE INTERFACES
