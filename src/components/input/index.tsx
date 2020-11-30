import React, {
	useCallback,
	useState,
	useEffect,
	useRef,
	useImperativeHandle,
	forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';

import { useField } from '@unform/core';

import { Container, TextoInput, Icone } from './styles';

interface InputPropriedade extends TextInputProps {
	nome: string;
	icone: string;
}

interface InputvalorReferencia {
	valor: string;
}

interface InputRef {
	focus(): void;
}

// ALTERAMOS O TIPO PARA PODER RECEBER A PROPRIEDADE ref
const Input: React.RefForwardingComponent<InputRef, InputPropriedade> = (
	{ nome, icone, ...rest },
	ref,
) => {
	const inputElementoRef = useRef<any>(null);

	const { registerField, defaultValue = '', fieldName, error } = useField(nome);

	const inputValorRef = useRef<InputvalorReferencia>({ valor: defaultValue });

	const [selecionado, setSelecionado] = useState(false);
	const usuarioInputSelecionado = useCallback(() => {
		setSelecionado(true);
	}, []);

	const [preenchido, setPreenchido] = useState(false);
	const usuarioInputPreenchido = useCallback(() => {
		setSelecionado(false);
		setPreenchido(!!inputValorRef.current.valor);
	}, []);

	// VAI PASSAR AS INFORMACOES DO FILHO PARA O PAI
	// FALAR QUE focus PERTENCE A ref
	useImperativeHandle(ref, () => ({
		focus() {
			inputElementoRef.current.focus();
		},
	}));

	useEffect(() => {
		registerField<string>({
			name: fieldName,
			ref: inputValorRef.current,
			path: 'valor',
			setValue(ref: any, valor) {
				inputValorRef.current.valor = valor;
				// VAI MUDAR VISUALMENTE O TEXTO DENTRO DO CAMPO
				inputElementoRef.current.setNativeProps({ text: valor });
			},
			// VAI APAGAR AS INFORMACOES QUANDO FOR SOLICITADO
			clearValue() {
				inputValorRef.current.valor = '';
				inputElementoRef.current.clear();
			},
		});
	}, [fieldName, registerField]);

	return (
		<Container selecionado={selecionado} temErro={!!error}>
			<Icone
				name={icone}
				size={20}
				color={selecionado || preenchido ? '#ff9000' : '#666360'}
			/>

			<TextoInput
				ref={inputElementoRef}
				// DEFINE O TEMA DO TECLADO
				keyboardAppearance="dark"
				// DEFINE A COR DO TEXTO DENTRO DO CAMPO
				placeholderTextColor="#666360"
				// VALOR QUE DEVE TER DENTRO AO INICIAR
				defaultValue={defaultValue}
				// FUNCAO QUE EXECUTA QUANDO O TEXTO DIGITADO MUDA
				onFocus={usuarioInputSelecionado}
				onBlur={usuarioInputPreenchido}
				onChangeText={valor => {
					// RECUPERA O VALOR SALVO
					inputValorRef.current.valor = valor;
				}}
				{...rest}
			/>
		</Container>
	);
};

export default forwardRef(Input);
