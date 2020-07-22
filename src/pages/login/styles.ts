import Styled from 'styled-components';
import { shade } from 'polished';

import BackgroundImagem from '../../assets/backgroundLogin.png';

export const Container = Styled.div`
	height: 100vh; /* FAZ OCUPAR TODA A TELA DISPONIVEL */
	display: flex;
	align-items: stretch; /* FAZ OS ITENS DENTRO OCUPAR TODO ESPACO */
`;

export const Conteudo = Styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	place-content: center; /* ALINHAMENTO */
	width: 100%;
	max-width: 700px;

	form {
		margin: 80px 0;
		width: 340px;
		text-align: center;

		h1 {
			margin-bottom: 24px;
		}

		input {
			background: #232129;
			border-radius: 10px;
			border: 2px solid #232129;
			padding: 16px;
			width: 100%;
			color: #f4ede8;

			& + input {
				margin-top: 8px;
			}
		}

		button {
			background: #ff9000;
			height: 56px;
			border-radius: 10px;
			border: 0;
			padding: 0 16px;
			color: #312e38;
			width: 100%;
			font-weight: 500;
			margin-top: 16px;
			transition: background-color 0.2s;

			&:hover {
				background: ${shade(0.2, '#ff9000')};
			}
		}

		a {
			color: #f4ede8;
			display: block;
			margin-top: 24px;
			text-decoration: none;
			transition: color 0.2s;

			&:hover {
				color: ${shade(0.2, '#f4ede8')};
			}
		}
	}

	/* > DEFINE ESTA CONFIGURACOES PARA O a QUE ESTA FORA DO form */
	> a {
		color: #ff9000;
		display: block;
		margin-top: 24px;
		text-decoration: none;
		transition: color 0.2s;
		display: flex;
		align-items: center;

		svg {
			margin-right: 16px;
		}

		&:hover {
			color: ${shade(0.2, '#ff9000')};
		}
	}
`;

export const Background = Styled.div`
	flex: 1;
	background: url(${BackgroundImagem}) no-repeat center;
	background-size: cover; /* FORCA A ACUPAR TODO ESPACO DISPONIVEL */
`;
