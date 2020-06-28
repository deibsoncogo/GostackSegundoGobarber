import { Router } from 'express';
import { uuid } from 'uuidv4';

const agendamentosRota = Router();

// CRIA UM BANCO DE BADOS QUE RESETA AO REINICIAR O SERVIDOR
const agendamentos = [];

agendamentosRota.post('/', (request, response) => {
	// RECUPERA AS INFORMACOES NO request.body
	const { profissional, data } = request.body;

	// PERMITE A MINUPULACAO DOS DADOS ANTES DE SALVAR
	const agendamento = {
		id: uuid(),
		profissional,
		data,
	};

	// REALIZA O SALVAMENTO NO BANCO DE DADOS TEMPORARIO
	agendamentos.push(agendamento);

	// LISTA OS DADOS SALVO ACIMA
	return response.json(agendamento);
});

export default agendamentosRota;
