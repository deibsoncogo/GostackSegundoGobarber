import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AgendamentoRepositorio from '../repositories/agendamento';

const agendamentosRota = Router();

// VINCULA O REPOSITORIO COM A ROTA
const agendamentoRepositorio = new AgendamentoRepositorio();

agendamentosRota.get('/', (request, response) => {
	// UTILIZA O VINCULO CRIADO COM O REPOSITORIO
	const agendamentos = agendamentoRepositorio.listarTodos();

	return response.json(agendamentos);
});

agendamentosRota.post('/', (request, response) => {
	// RECUPERA AS INFORMACOES NO request.body
	const { profissional, data } = request.body;

	// CONVERTE O FORMATO DO HORARIO E ARRENDONDA PARA HORA CHEIA
	const dataConvertidaeArredondada = startOfHour(parseISO(data));

	// ENVIA E TRAZ O RESUTLADO DA EXISTENCIA DESSE HORARIO
	const horarioDuplicado = agendamentoRepositorio.buscaHorario(dataConvertidaeArredondada);

	// RETORNAR UMA MENSAGEM SE A VARIAVEL POR VERDADEIRA
	if (horarioDuplicado) {
		return response.status(400).json({ erro: 'Horário já reservado' });
	}

	// REALIZA O SALVAMENTO NO BANCO DE DADOS TEMPORARIO SEM UM CONSTRUCTOR
	// agendamentos.push(agendamento);

	const agendamento = agendamentoRepositorio.create(
		profissional,
		dataConvertidaeArredondada,
	);

	// LISTA OS DADOS SALVO ACIMA
	return response.json(agendamento);
});

export default agendamentosRota;
