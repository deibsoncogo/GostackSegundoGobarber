import Styled from 'styled-components';

export const Container = Styled.div`
	/* TRANSAFORMA RELATIVO AO CONTAINER */
	position: relative;

	span {
		width: 160px;
		background: #ff9000;
		padding: 8px;
		border-radius: 4px;
		font-size: 14px;
		font-weight: 500;
		opacity: 0;
		transition: opacity 0.4s;
		visibility: hidden;

		position: absolute;
		/* AS 3 LINHAS DE CODIGO SERVEM PARA ALINHA NO CENTRO E EM CIMA */
		bottom: calc(100% + 12px);
		left: 50%;
		transform: translateX(-50%);

		color: #312e38;

		/* COMANDOS PARA CRIAR UM SETA NO CAMPO */
		&::before {
			content: '';
			border-style: solid;
			border-color: #ff9000 transparent;
			border-width: 6px 6px 0 6px;
			top: 100%;
			position: absolute;
			left: 50%:
			transform: translateX(-50%);
			width: 0;
		}
	}

	/* FAZ APARECE A MENSAGEM DE ERRO QUANDO PASSAR O MOUSE*/
	&:hover span {
		/* ABRE O TOOLTIP */
		opacity: 1;
		/* DESOLCUTA O TOOLTIP */
		visibility: visible;
	}
`;
