import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

// RECEBE AS TIPAGEM DE UM input
interface InputPropriedade extends InputHTMLAttributes<HTMLInputElement> {
	// TRANFORMA ESTA INFORMACAO OBRIGATORIA
	nome: string;
	// RECEBE AS TIPAGENS DE UM COMPONENTE ICONE
	// TORNA ELE OPCIONAL
	icone?: React.ComponentType<IconBaseProps>;
}

// O props ASSIM FAZ RECEBER TODO TIPO DE PROPRIEDADE
// PARA ENTENDER QUE E UM COMPONENTE DEVEMOS USAR LETRA MAIUSCULA
const Input: React.FC<InputPropriedade> = ({ icone: Icone, ...rest }) => (
	<Container>
		{/* REALIZA UMA VERIFICACAO SE EXISTE UM ICONE */}
		{Icone && <Icone size={20} />}
		{/* O props ASSIM ENVIA TODO TIPO DE PROPRIEDADE */}
		<input {...rest} />
	</Container>
);

export default Input;
