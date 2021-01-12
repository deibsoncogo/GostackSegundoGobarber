import { parseISO } from 'date-fns';
import { Router } from 'express';

import AgendamentoRepositorio from '@modules/agendamentos/infra/repositories/agendamento';
import CriarAgendamentoServico from '@modules/agendamentos/services/CriarAgendamento';

import VerificarAutenticacaoMiddlewares from '@shared/infra/middlewares/verificarAutenticacao';

const agendamentoRota = Router();
const agendamentoRepositorio = new AgendamentoRepositorio();

// VINCULA O REPOSITORIO COM A ROTA
// const agendamentoRepositorio = new AgendamentoRepositorio();

// ESTE METODO E EXECUTADO TODA VEZ QUE OUTRO METODO ABAIXO E CHAMADO
agendamentoRota.use(VerificarAutenticacaoMiddlewares);

// agendamentoRota.get('/', async (request, response) => {
// 	// const agendamentoRepositorio = getCustomRepository(AgendamentoRepositorio);

// 	// UTILIZA O VINCULO CRIADO COM O REPOSITORIO
// 	const agendamento = await agendamentoRepositorio.find();

// 	return response.json(agendamento);
// });

agendamentoRota.post('/', async (request, response) => {
	// RECUPERA AS INFORMACOES NO request.body
	const { profissional_id, data } = request.body;

	// CONVERTE O FORMATO DO HORARIO
	const converterHorario = parseISO(data);

	// VINCULO DO SERVICO COM A ROTA
	const criarAgendamento = new CriarAgendamentoServico(agendamentoRepositorio);

	// ENVIA OS DADOS PARA O SERVICO VINCULADO
	const agendamento = await criarAgendamento.execute({
		profissional_id,
		data: converterHorario,
	});

	// LISTA OS DADOS SALVO ACIMA
	return response.json(agendamento);
});

export default agendamentoRota;
