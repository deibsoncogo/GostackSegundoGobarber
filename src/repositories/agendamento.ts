import { isEqual } from 'date-fns';

import AgendamentoModelo from '../models/agendamento';

// CRIANDO TIPAGEM PARA O DTO DE CRIAR AGENDAMENTO
interface CriarAgendamentoDTO {
	profissional: string;
	data: Date;
}

class Agendamento {
	// VINCULANDO A TIPAGEM
	private agendamentos: AgendamentoModelo[];

	// CRIA UM BANCO DE BADOS QUE RESETA AO REINICIAR O SERVIDOR
	// agendamentos: AgendamentoModelo[] = [];
	// O constructor INICIALIZA NOSSO BANCO DE DADOS
	constructor() {
		this.agendamentos = [];
	}

	// RETORNAR TODOS AGENDAMENTOS CADASTRADO
	public listarTodos(): AgendamentoModelo[] {
		return this.agendamentos;
	}

	// VERIFICA SE JA EXISTE ESTE HORARIO CADASTRADO
	public buscaHorario(data: Date): AgendamentoModelo | null {
		const resultadoBusca = this.agendamentos.find(agendamento =>
			isEqual(data, agendamento.data),
		);

		// SE NAO EXISTIR O HORARIO CADASTRADO VAI RETORNAR NULO
		return resultadoBusca || null;
	}

	public criar({ profissional, data }: CriarAgendamentoDTO): AgendamentoModelo {
		// PERMITE A MINIPULACAO DOS DADOS ANTES DE SALVAR NO FORMATO DE OBJETO
		// const agendamento = {
		// 	id: uuid(),
		// 	profissional,
		// 	data: dataConvertidaeArredondada,
		// };
		// VINCULO DO MODELO COM O REPOSITORIO
		const agendamento = new AgendamentoModelo({ profissional, data });

		this.agendamentos.push(agendamento);

		return agendamento;
	}
}

export default Agendamento;
