import Styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerPropriedade {
	tipo?: 'informacao' | 'sucesso' | 'erro';
	temDescricao: boolean;
}

// TIPOS DE CONDICOES DO ESTILO ABAIXO
const tipoToast = {
	// O NOME DO GRUPO DEVE SER IGUAL DO TIPO
	informacao: css`
		background: #ebf8ff;
		color: #3172b7;
	`,
	sucesso: css`
		background: #e6fffa;
		color: #2e656a;
	`,
	erro: css`
		background: #fddede;
		color: #c53030;
	`,
};

export const Container = Styled(animated.div)<ContainerPropriedade>`
	width: 360px;

	position: relative;
	padding: 16px 30px 16px 16px;
	border-radius: 10px;
	/* UTILIZA A COR PRETA COM 20% DE OPACIDADE */
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

	display: flex;

	/* VAI CRIAR UM ESPACO ENTRE O TOAST QUANDO TIVER MAIS DE UM */
	& + div {
		margin-top: 8px;
	}

	/* METODO PARA SIMPLIFICAR VARIAS CONDICOES */
	${props => tipoToast[props.tipo || 'informacao']}

	> svg {
		margin: 4px 12px 0px 0px;
	}

	div {
		flex: 1;

		p {
			margin-top: 4px;
			font-size: 14px;
			opacity: 0.8;
			line-height: 20px;
		}
	}

	button {
		position: absolute;
		right: 16px;
		top: 19px;
		opacity: 0.6;
		border: 0;
		background: transparent;
		/* VAI UTILIZAR A COR DO UTILIZADA DE FUNDO (CONTAINER) */
		color: inherit;
	}

	/* SE temDescricao FOR false VAI EXECUTAR ESTA ESTILIZACAO */
	${props =>
		!props.temDescricao &&
		css`
			align-items: center;

			svg {
				margin-top: 0;
			}
		`}
`;
