import React, { useEffect } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';

import { MensagemTipagem, useToast } from '../../../hooks/toast';
import { Container } from './styles';

interface ToastPropriedade {
	informacao: MensagemTipagem;
}

const icone = {
	informacao: <FiInfo size={24} />,
	sucesso: <FiCheckCircle size={24} />,
	erro: <FiAlertCircle size={24} />,
};

const Toast: React.FC<ToastPropriedade> = ({ informacao }) => {
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
		<Container tipo={informacao.tipo} temDescricao={!!informacao.descricao}>
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
