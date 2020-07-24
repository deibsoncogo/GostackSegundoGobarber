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
