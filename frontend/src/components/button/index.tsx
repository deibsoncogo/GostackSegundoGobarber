import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// METODO SIMPLIFICADO PARA RECEBER AS TIPAGENS
type ButtonPropriedade = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonPropriedade> = ({ children, ...rest }) => (
	<Container type="button" {...rest}>
		{children}
	</Container>
);

export default Button;
