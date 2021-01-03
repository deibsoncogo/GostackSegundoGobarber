import CriarAgendamentoInterfaceDTO from '@modules/agendamentos/dtos/Icriaragendamento';
import { getRepository, Repository } from 'typeorm';

import AgendamentoEntidade from '../entities/agendamento';
import AgendamentoIntefaceRepositorio from '@modules/agendamentos/repositories/Iagendamento';

// POSSIBILITA CRIAR UM REPOSITORIO PARA O TypeORM
// @EntityRepository(AgendamentoEntidade)
// Extends ENVIA ESTE REPOSITORIO PARA DENTRO DO TypeORM
// implements VINCULA AS REGRAS CRIA DO ARQUIVO IMPORTADO
// class Agendamento extends Repository<AgendamentoEntidade>
class Agendamento implements AgendamentoIntefaceRepositorio {
	// VARIAVEL PRIVADA DO TIPO Repository DA ENTIDADE AgendamentoEntidade
	private ORMRepositorio: Repository<AgendamentoEntidade>;

	// PARA EXECUTAR ALGO QUANDO O REPOSITORIO FOR EXECUTADO
	constructor() {
		this.ORMRepositorio = getRepository(AgendamentoEntidade);
	}

	// VERIFICA SE JA EXISTE ESTE HORARIO CADASTRADO
	public async buscaHorario(data: Date): Promise<AgendamentoEntidade | undefined> {
		const resultadoBusca = await this.ORMRepositorio.findOne({
			where: { data }, // where E UMA CONDICAO
		});

		// SE NAO EXISTIR O HORARIO CADASTRADO VAI RETORNAR NULO
		return resultadoBusca;
	}

	public async create({
		profissional_id,
		data,
	}: CriarAgendamentoInterfaceDTO): Promise<AgendamentoEntidade> {
		const agendamento = this.ORMRepositorio.create({ profissional_id, data });

		await this.ORMRepositorio.save(agendamento);

		return agendamento;
	}
}

export default Agendamento;

/** IREMOS REFATORAR ESTES COMANDOS COM OS REPOSITORIOS DO TypeORM
import { isEqual } from 'date-fns';

import AgendamentoEntidade from '../models/agendamento';

// CRIANDO TIPAGEM PARA O DTO DE CRIAR AGENDAMENTO
interface CriarAgendamentoDTO {
	profissional: string;
	data: Date;
}

class Agendamento {
	// VINCULANDO A TIPAGEM
	private agendamentos: AgendamentoEntidade[];

	// CRIA UM BANCO DE BADOS QUE RESETA AO REINICIAR O SERVIDOR
	// agendamentos: AgendamentoEntidade[] = [];
	// O constructor INICIALIZA NOSSO BANCO DE DADOS
	constructor() {
		this.agendamentos = [];
	}

	// RETORNAR TODOS AGENDAMENTOS CADASTRADO
	public listarTodos(): AgendamentoEntidade[] {
		return this.agendamentos;
	}

	// VERIFICA SE JA EXISTE ESTE HORARIO CADASTRADO
	public buscaHorario(data: Date): AgendamentoEntidade | null {
		const resultadoBusca = this.agendamentos.find(agendamento =>
			isEqual(data, agendamento.data),
		);

		// SE NAO EXISTIR O HORARIO CADASTRADO VAI RETORNAR NULO
		return resultadoBusca || null;
	}

	public criar({ profissional, data }: CriarAgendamentoDTO): AgendamentoEntidade {
		// PERMITE A MINIPULACAO DOS DADOS ANTES DE SALVAR NO FORMATO DE OBJETO
		// const agendamento = {
		// 	id: uuid(),
		// 	profissional,
		// 	data: dataConvertidaeArredondada,
		// };
		// VINCULO DO MODELO COM O REPOSITORIO
		const agendamento = new AgendamentoEntidade({ profissional, data });

		this.agendamentos.push(agendamento);

		return agendamento;
	}
}

export default Agendamento;
 */
