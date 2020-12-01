import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import Styled from 'styled-components/native';

export const Container = Styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
	padding: 0px 30px ${Platform.OS === 'android' ? 50 : 40}px 30px;
`;

export const Titulo = Styled.Text`
  font-size: 24px;
  color: #f4ede8;
  /* DEFINE A FONTE PARA TODO O PROGRAMA */
  font-family: 'RobotoSlab-Medium';
  margin: 44px 0 14px;
`;

export const AjudaSenha = Styled.TouchableOpacity`
	margin-top: 24px;
`;

export const AjudaSenhaTexto = Styled.Text`
	color: #f4ede8;
	font-size: 16px;
	font-family: 'RobotoSlab-Medium';
`;

// TouchableWithoutFeedback FAZ NAO ACONTECER UM EFEITO AO CLICAR
export const CriarConta = Styled.TouchableOpacity`
	position: absolute;
	left: 0;
	bottom: 0;
	right: 0;
	background: #312e38;
	border-top-width: 2px;
	border-color: #232129;
	/* VAI ADICIONAR O TAMANHO DE UM BOTAO QUE EXISTE EM BAIXO DO IPHONE COMO MARGEM */
	padding: 16px 0 ${16 + getBottomSpace()}px;

	justify-content: center;
	align-items: center;
	flex-direction: row;
`;

export const CriarContaTexto = Styled.Text`
	color: #ff9000;
	font-size: 18px;
	font-family: 'RobotoSlab-Medium';
	margin-left: 16px;
`;
