import IconeFeather from 'react-native-vector-icons/Feather';

import Styled, { css } from 'styled-components/native';

interface ContainerPropriedade {
	selecionado: boolean;
	temErro: boolean;
}

export const Container = Styled.View<ContainerPropriedade>`
	width: 100%;
	height: 60px;
	padding: 0 16px;
	background: #232129;
	border-radius: 10px;
	margin-bottom: 8px;
	border-width: 2px;
	border-color: #232129;

	/* DEFINE A FORMA DE ALINHAMENTO */
	flex-direction: row;
	align-items: center;

	${props =>
		props.temErro &&
		css`
			border-color: #c53030;
		`}

	${props =>
		props.selecionado &&
		css`
			border-color: #ff9000;
		`}
`;

export const TextoInput = Styled.TextInput`
 flex: 1;
 color: #ffffff;
 font-size: 16px;
 font-family: 'RobotoSlab-Regular';
`;

export const Icone = Styled(IconeFeather)`
	margin-right: 16px;
`;
