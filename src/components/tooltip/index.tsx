import React from 'react';

import { Container } from './styles';

interface Tipagem {
	titulo: string;
	// E OBRIGADO TER PARA FUNCIONAR A ESTILIZACAO VINCULADO AO TIPO
	// ELA NAO DEVE OBRIGATORIA
	className?: string;
}

const Tooltip: React.FC<Tipagem> = ({ titulo, className = '', children }) => {
	return (
		<Container className={className}>
			{children}
			{/* O span FICA POR CIMA DE TUDO */}
			<span>{titulo}</span>
		</Container>
	);
};

export default Tooltip;
