import Styled, { css } from 'styled-components';

import TooltipComponente from '../tooltip';

interface Tipagem {
	selecionado: boolean;
	preenchido: boolean;
	errado: boolean;
}

export const Container = Styled.div<Tipagem>`
	background: #232129;
	border-radius: 10px;
	padding: 16px;
	width: 100%;
	border: 2px solid #232129;
	color: #666360;
	display: flex;
	align-items: center;

	& + div {
		margin-top: 8px;
	}

	${props =>
		props.errado &&
		css`
			border-color: #c53030;
		`}

	${props =>
		props.selecionado &&
		css`
			color: #ff9000;
			border-color: #ff9000;
		`}

	${props =>
		props.preenchido &&
		css`
			color: #ff9000;
		`}

	input {
		flex: 1;
		background: transparent;
		border: 0;
		color: #f4ede8;

		&::placeholder {
			color: #666360;
		}
	}

	svg {
		margin-right: 16px;
	}
`;

// ESTILIZACAO VINCULADO AO TIPO
export const Erro = Styled(TooltipComponente)`
	height: 20px;
	margin-left: 16px;

	svg {
		margin: 0;
	}

	span {
		background: #c53030;
		color: #ffffff;

		&::before {
			border-color: #c53030 transparent;
		}
	}
`;
