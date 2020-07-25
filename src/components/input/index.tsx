import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

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
const Input: React.FC<InputPropriedade> = ({ nome, icone: Icone, ...rest }) => {
	const inputRef = useRef(null);

	// PREPARACAO PARA CRIAR UM REGISTRO
	const { fieldName, defaultValue, error, registerField } = useField(nome);

	// CRIA UM REGISTRO QUANDO O EFFECT EXECUTAR
	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		});
	}, [fieldName, registerField]);

	return (
		<Container>
			{/* REALIZA UMA VERIFICACAO SE EXISTE UM ICONE */}
			{Icone && <Icone size={20} />}
			{/* O props ASSIM ENVIA TODO TIPO DE PROPRIEDADE */}
			{/* O defaultValue PERMITE INICIAR UM VALOR INICIAL NO CAMPO */}
			<input defaultValue={defaultValue} ref={inputRef} {...rest} />
		</Container>
	);
};

export default Input;
