import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CriarAgendamentoServico from '@modules/agendamentos/services/CriarAgendamento';

export default class AgendamentoController {
	public async criar(request: Request, response: Response): Promise<Response> {
		// RECUPERA AS INFORMACOES NO request.body
		const { profissional_id, data } = request.body;

		// CONVERTE O FORMATO DO HORARIO
		const converterHorario = parseISO(data);

		// VINCULO DO SERVICO COM A ROTA
		const criarAgendamento = container.resolve(CriarAgendamentoServico);

		// ENVIA OS DADOS PARA O SERVICO VINCULADO
		const agendamento = await criarAgendamento.execute({
			profissional_id,
			data: converterHorario,
		});

		// LISTA OS DADOS SALVO ACIMA
		return response.json(agendamento);
	}
}
