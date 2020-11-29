import React from 'react';
import { useTransition } from 'react-spring';

import { MensagemTipagem } from '../../hooks/toast';

import Mensagem from './sub';

import { Container } from './styles';

interface ToastPropriedade {
	mensagem: MensagemTipagem[];
}

const Toast: React.FC<ToastPropriedade> = ({ mensagem }) => {
	const mensagemEfeito = useTransition(mensagem, informacao => informacao.id, {
		// EFEITO A EXECUTAR NA CRIACAO
		from: { right: '-120%', opacity: 0 },
		// EFEITO QUE EXECUTA QUANDO DEPOIS DO PRIMEIRO E ANTES DO ULTIMO
		enter: { right: '0%', opacity: 1 },
		// EFEITO A EXECUTAR PARA SAIR DA TELA
		leave: { right: '-120%', opacity: 0 },
	});

	return (
		<Container>
			{mensagemEfeito.map(({ item, key, props }) => (
				<Mensagem key={key} style={props} informacao={item} />
			))}
		</Container>
	);
};

export default Toast;
