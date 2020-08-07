import React, { useEffect } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';

import { MensagemTipagem, useToast } from '../../../hooks/toast';
import { Container } from './styles';

interface ToastPropriedade {
	informacao: MensagemTipagem;
	style: object;
}

const icone = {
	informacao: <FiInfo size={24} />,
	sucesso: <FiCheckCircle size={24} />,
	erro: <FiAlertCircle size={24} />,
};

const Toast: React.FC<ToastPropriedade> = ({ informacao, style }) => {
	const { removerToast } = useToast();

	useEffect(() => {
		const duracao = setTimeout(() => {
			removerToast(informacao.id);
		}, 3000);

		return () => {
			clearTimeout(duracao);
		};
	}, [removerToast, informacao.id]);

	return (
		// temDescricao SEM TRUE OU FALSE RECEBE O VALOR COMO true
		<Container tipo={informacao.tipo} temDescricao={!!informacao.descricao} style={style}>
			{icone[informacao.tipo || 'informacao']}

			<div>
				<strong>{informacao.titulo}</strong>
				{informacao.descricao && <p>{informacao.descricao}</p>}
			</div>

			<button onClick={() => removerToast(informacao.id)} type="button">
				<FiXCircle size={18} />
			</button>
		</Container>
	);
};

export default Toast;
