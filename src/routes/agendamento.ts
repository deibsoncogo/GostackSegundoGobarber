import { Router } from 'express';
import { parseISO } from 'date-fns';

import AgendamentoRepositorio from '../repositories/agendamento';
import CriarAgendamentoServico from '../services/CriarAgendamento';

const agendamentosRota = Router();

// VINCULA O REPOSITORIO COM A ROTA
const agendamentoRepositorio = new AgendamentoRepositorio();

agendamentosRota.get('/', (request, response) => {
	// UTILIZA O VINCULO CRIADO COM O REPOSITORIO
	const agendamentos = agendamentoRepositorio.listarTodos();

	return response.json(agendamentos);
});

agendamentosRota.post('/', (request, response) => {
	// BUSCA PELO TIPO DE ACAO DO throw (Error)
	try {
		// RECUPERA AS INFORMACOES NO request.body
		const { profissional, data } = request.body;

		// CONVERTE O FORMATO DO HORARIO
		const converterHorario = parseISO(data);

		// VINCULO DO SERVICO COM A ROTA
		const criarAgendamento = new CriarAgendamentoServico(agendamentoRepositorio);

		// ENVIA OS DADOS PARA O SERVICO VINCULADO
		const agendamento = criarAgendamento.execute({
			profissional,
			data: converterHorario,
		});

		// LISTA OS DADOS SALVO ACIMA
		return response.json(agendamento);
		// AO ENCONTRAR O TIPO INFORMADO (err) EXECUTA O COMANDO ABAIXO
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

export default agendamentosRota;
