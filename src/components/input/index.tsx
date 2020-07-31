import React, {
	InputHTMLAttributes,
	useEffect,
	useRef,
	useState,
	useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Erro } from './styles';

// RECEBE AS TIPAGEM DE UM input
interface InputPropriedade extends InputHTMLAttributes<HTMLInputElement> {
	// TRANFORMA ESTA INFORMACAO OBRIGATORIA
	nome: string;
	// RECEBE AS TIPAGENS DE UM COMPONENTE ICONE E TORNA ELE OPCIONAL
	icone?: React.ComponentType<IconBaseProps>;
}

// O props ASSIM FAZ RECEBER TODO TIPO DE PROPRIEDADE
// PARA ENTENDER QUE E UM COMPONENTE DEVEMOS USAR LETRA MAIUSCULA
const Input: React.FC<InputPropriedade> = ({ nome, icone: Icone, ...rest }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [selecionado, setSelecionado] = useState(false);
	const [preenchido, setPreenchido] = useState(false);

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

	const usuarioSelecionou = useCallback(() => {
		setSelecionado(true);
	}, []);

	// VAI DEIXAR O ICONE LARANJA SE ESTIVER PREENCHIDO
	const usuarioDeselecionou = useCallback(() => {
		setSelecionado(false);

		// AMBOS COMANDOS SAO IGUAIS
		// setPreenchido(!!inputRef.current?.value);
		if (inputRef.current?.value) {
			setPreenchido(true);
		} else {
			setPreenchido(false);
		}
	}, []);

	return (
		<Container errado={!!error} preenchido={preenchido} selecionado={selecionado}>
			{/* REALIZA UMA VERIFICACAO SE EXISTE UM ICONE */}
			{Icone && <Icone size={20} />}
			{/* O props ASSIM ENVIA TODO TIPO DE PROPRIEDADE */}
			{/* O defaultValue PERMITE INICIAR UM VALOR INICIAL NO CAMPO */}
			<input
				// EXECUTA A FUNCAO QUANDO O INPUT FOR SELECIONADO
				onFocus={usuarioSelecionou}
				// EXECUTA A FUNCAO QUANDO O INPUT FOR DEIXAR DE SER SELECIONADO
				onBlur={usuarioDeselecionou}
				defaultValue={defaultValue}
				ref={inputRef}
				{...rest}
			/>

			{error && (
				<Erro titulo={error}>
					<FiAlertCircle color="#c53030" size={20} />
				</Erro>
			)}
		</Container>
	);
};

export default Input;
