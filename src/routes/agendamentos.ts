import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import AgendamentoModelo from '../models/agendamento';

const agendamentosRota = Router();

// CRIA UM BANCO DE BADOS QUE RESETA AO REINICIAR O SERVIDOR
// VINCULANDO A TIPAGEM
const agendamentos: AgendamentoModelo[] = [];

agendamentosRota.post('/', (request, response) => {
	// RECUPERA AS INFORMACOES NO request.body
	const { profissional, data } = request.body;

	// CONVERTE O FORMATO DO HORARIO E ARRENDONDA PARA HORA CHEIA
	const dataConvertidaeArredondada = startOfHour(parseISO(data));

	// VERIFICA SE JA EXISTE ESTE HORARIO CADASTRADO
	const horarioDuplicado = agendamentos.find(agendamento =>
		isEqual(dataConvertidaeArredondada, agendamento.data),
	);

	// RETORNAR UMA MENSAGEM SE A VARIAVEL POR VERDADEIRA
	if (horarioDuplicado) {
		return response.status(400).json({ erro: 'Horário já reservado' });
	}

	// PERMITE A MINIPULACAO DOS DADOS ANTES DE SALVAR NO FORMATO DE OBJETO
	// const agendamento = {
	// 	id: uuid(),
	// 	profissional,
	// 	data: dataConvertidaeArredondada,
	// };
	// PERMITE A MINIPULACAO DOS DADOS ANTES DE SALVAR COM O CONSTRUCTOR
	const agendamento = new AgendamentoModelo(profissional, dataConvertidaeArredondada);

	// REALIZA O SALVAMENTO NO BANCO DE DADOS TEMPORARIO
	agendamentos.push(agendamento);

	// LISTA OS DADOS SALVO ACIMA
	return response.json(agendamento);
});

export default agendamentosRota;
