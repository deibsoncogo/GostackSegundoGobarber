import React from 'react';

import Mensagem from './sub';
import { MensagemTipagem } from '../../hooks/toast';

import { Container } from './styles';

interface ToastPropriedade {
	mensagem: MensagemTipagem[];
}

const Toast: React.FC<ToastPropriedade> = ({ mensagem }) => {
	return (
		<Container>
			{mensagem.map(informacao => (
				// temDescricao SEM TRUE OU FALSE RECEBE O VALOR COMO true
				<Mensagem key={informacao.id} informacao={informacao} />
			))}
		</Container>
	);
};

export default Toast;
