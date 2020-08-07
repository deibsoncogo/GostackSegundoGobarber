import Styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import BackgroundImagem from '../../assets/backgroundCadastro.png';

export const Container = Styled.div`
	height: 100vh; /* FAZ OCUPAR TODA A TELA DISPONIVEL */
	display: flex;
	align-items: stretch; /* FAZ OS ITENS DENTRO OCUPAR TODO ESPACO */
`;

export const Conteudo = Styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 100%;
	max-width: 700px;
`;

const aparecerDireita = keyframes`
	from {
		opacity: 0;
		transform: translateX(50px);
	}

	to {
		opacity: 1;
		transform: translateX( 0px);
	}
`;

export const Animacao = Styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	animation: ${aparecerDireita} 1s;

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
