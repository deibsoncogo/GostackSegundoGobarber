import Styled, { css } from 'styled-components';

interface ContainerPropriedade {
	selecionado: boolean;
	preenchido: boolean;
}

export const Container = Styled.div<ContainerPropriedade>`
	background: #232129;
	border-radius: 10px;
	border: 2px solid #232129;
	padding: 16px;
	width: 100%;
	color: #666360;
	display: flex;
	align-items: center;

	& + div {
		margin-top: 8px;
	}

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
