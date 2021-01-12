import { startOfHour } from 'date-fns';

import AgendamentoModelo from '../infra/entities/agendamento';
import AgendamentoRepositorioInterface from '../repositories/Iagendamento';

import GeralErro from '@shared/errors/geral';

// CRIANDO TIPAGEM PARA O RECEBIMENTO DAS INFORMACOES
interface RequestDTO {
	profissional_id: string;
	data: Date;
}

class CriarAgendamento {
	// APLICA A LETRA D DO SOLID
	// TRANFORMANDO A CLASSE DEPENDENTE DA INTERFACE INVES DE UMA DEPENDENCIA
	constructor(private agendamentoRepositorio: AgendamentoRepositorioInterface) {}

	/** COM A IMPLEMENTACAO DO BANCO DE DADOS NAO PRECISAMOS MAIS DESTES COMANDOS
	// CRIA UMA VARIAVEL LOCAL
	private agendamentoRepositorio: AgendamentoRepositorio;

	// CRIA O VINCULO COM O BANCO DE DADOS DO REPOSITORIO
	constructor(agendamentoRepositorio: AgendamentoRepositorio) {
		this.agendamentoRepositorio = agendamentoRepositorio;
	}
	 */

	public async execute({ profissional_id, data }: RequestDTO): Promise<AgendamentoModelo> {
		// PREMITE A UTILIZACAO DOS REPOSITORIOS
		// const agendamentoRepositorio = getCustomRepository(AgendamentoRepositorio);

		// ARRENDONDA PARA HORA CHEIA
		const arrendondarHorario = startOfHour(data);

		// ENVIA E TRAZ O RESUTLADO DA EXISTENCIA DESSE HORARIO
		const horarioDuplicado = await this.agendamentoRepositorio.buscaHorario(
			arrendondarHorario,
		);

		// RETORNAR UMA MENSAGEM SE A VARIAVEL POR VERDADEIRA
		// AQUI NAO TEMOS ACESSO AO RESPONSE OU REQUEST DO USUARIO
		// COM ISSO CRIAMOS UM throw TIPO Error
		if (horarioDuplicado) {
			throw new GeralErro('Horário já reservado', 400);
		}

		// REALIZA O SALVAMENTO NO BANCO DE DADOS TEMPORARIO SEM UM CONSTRUCTOR
		// agendamentos.push(agendamento);

		// VINCULO DO REPOSITORIO COM O SERVICO
		// UTILIZANDO O METODO DE OBJETO PARA MANIPULAR OS DADOS
		// O METODO SOMENTE CRIA OS DADOS
		const agendamento = await this.agendamentoRepositorio.create({
			profissional_id,
			data: arrendondarHorario,
		});

		// SERVIA PARA SALVAR OS DADOS AGORA O create CRIA E SALVA
		// await agendamentoRepositorio.save(agendamento);

		return agendamento;
	}
}

export default CriarAgendamento;
