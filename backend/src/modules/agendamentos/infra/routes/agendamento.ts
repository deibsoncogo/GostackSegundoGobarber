import { Router } from 'express';

import VerificarAutenticacaoMiddlewares from '@shared/infra/middlewares/verificarAutenticacao';

import AgendamentoController from '../controllers/agendamentoController';

const agendamentoRota = Router();
// VINCULA O REPOSITORIO COM A ROTA
// const agendamentoRepositorio = new AgendamentoRepositorio();

const agendamentoController = new AgendamentoController();

// ESTE METODO E EXECUTADO TODA VEZ QUE OUTRO METODO ABAIXO E CHAMADO
agendamentoRota.use(VerificarAutenticacaoMiddlewares);

// agendamentoRota.get('/', async (request, response) => {
// 	// const agendamentoRepositorio = getCustomRepository(AgendamentoRepositorio);

// 	// UTILIZA O VINCULO CRIADO COM O REPOSITORIO
// 	const agendamento = await agendamentoRepositorio.find();

// 	return response.json(agendamento);
// });

agendamentoRota.post('/', agendamentoController.criar);

export default agendamentoRota;
