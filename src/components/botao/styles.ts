import { RectButton } from 'react-native-gesture-handler';

import Styled from 'styled-components/native';

// PARA USAR ALGO QUE NAO PERTENCE AO STYLED USAMOS ()
export const Container = Styled(RectButton)`
	/* width: 100%; */
	height: 60px;
	background: #ff9000;
	border-radius: 10px;
	margin-top: 8px;


	/* O REACT NATIVE JA VEM COM ESTE COMANDO ATIVO */
	/* display: flex; */
	justify-content: center;
	align-items: center;
`;

export const TextoBotao = Styled.Text`
	font-family: 'RobotoSlab-Medium';
	color: #312e38;
	font-size: 18px;
`;
