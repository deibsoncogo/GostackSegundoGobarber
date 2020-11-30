import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, TextoBotao } from './styles';

interface BotaoPropriedade extends RectButtonProperties {
	children: string;
}

const Botao: React.FC<BotaoPropriedade> = ({ children, ...rest }) => (
	<Container {...rest}>
		<TextoBotao>{children}</TextoBotao>
	</Container>
);

export default Botao;
