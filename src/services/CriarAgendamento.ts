import { startOfHour } from 'date-fns';

import AgendamentoModelo from '../models/agendamento';
import AgendamentoRepositorio from '../repositories/agendamento';

// CRIANDO TIPAGEM PARA O RECEBIMENTO DAS INFORMACOES
interface RequestDTO {
	profissional: string;
	data: Date;
}

class CriarAgendamento {
	// CRIA UMA VARIAVEL LOCAL
	private agendamentoRepositorio: AgendamentoRepositorio;

	// CRIA O VINCULO COM O BANCO DE DADOS DO REPOSITORIO
	constructor(agendamentoRepositorio: AgendamentoRepositorio) {
		this.agendamentoRepositorio = agendamentoRepositorio;
	}

	public execute({ profissional, data }: RequestDTO): AgendamentoModelo {
		// ARRENDONDA PARA HORA CHEIA
		const arrendondarHorario = startOfHour(data);

		// ENVIA E TRAZ O RESUTLADO DA EXISTENCIA DESSE HORARIO
		const horarioDuplicado = this.agendamentoRepositorio.buscaHorario(arrendondarHorario);

		// RETORNAR UMA MENSAGEM SE A VARIAVEL POR VERDADEIRA
		// AQUI NAO TEMOS ACESSO AO RESPONSE OU REQUEST DO USUARIO
		// COM ISSO CRIAMOS UM throw TIPO Error
		if (horarioDuplicado) {
			throw Error('Horário já reservado');
		}

		// REALIZA O SALVAMENTO NO BANCO DE DADOS TEMPORARIO SEM UM CONSTRUCTOR
		// agendamentos.push(agendamento);

		// VINCULO DO REPOSITORIO COM O SERVICO
		// UTILIZANDO O METODO DE OBJETO PARA MANIPULAR OS DADOS
		const agendamento = this.agendamentoRepositorio.criar({
			profissional,
			data: arrendondarHorario,
		});

		return agendamento;
	}
}

export default CriarAgendamento;
