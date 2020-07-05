import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AgendamentoRepositorio from '../repositories/agendamento';
import CriarAgendamentoServico from '../services/CriarAgendamento';

const agendamentosRota = Router();

// VINCULA O REPOSITORIO COM A ROTA
// const agendamentoRepositorio = new AgendamentoRepositorio();

agendamentosRota.get('/', async (request, response) => {
	const agendamentoRepositorio = getCustomRepository(AgendamentoRepositorio);

	// UTILIZA O VINCULO CRIADO COM O REPOSITORIO
	const agendamentos = await agendamentoRepositorio.find();

	return response.json(agendamentos);
});

agendamentosRota.post('/', async (request, response) => {
	// BUSCA PELO TIPO DE ACAO DO throw (Error)
	try {
		// RECUPERA AS INFORMACOES NO request.body
		const { profissional_id, data } = request.body;

		// CONVERTE O FORMATO DO HORARIO
		const converterHorario = parseISO(data);

		// VINCULO DO SERVICO COM A ROTA
		const criarAgendamento = new CriarAgendamentoServico();

		// ENVIA OS DADOS PARA O SERVICO VINCULADO
		const agendamento = await criarAgendamento.execute({
			profissional_id,
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
