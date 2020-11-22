import React, { useRef, useCallback } from 'react'; // SING UP
import {
	Image,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	Alert,
} from 'react-native';
import IconeFeather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import Api from '../../services/api';
import BotaoComponente from '../../components/botao';
import InputComponente from '../../components/input';
import ValidacaoErroUtilizario from '../../utils/validacaoerro';
import logoImagem from '../../assets/logo.png';

import { Container, Titulo, Voltar, VoltarTexto } from './styles';

interface cadastroUsuario {
	nome: string;
	email: string;
	senha: string;
}

const Cadastro: React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const navegacao = useNavigation();

	const emailInputRef = useRef<TextInput>(null);
	const senhaInputRef = useRef<TextInput>(null);

	const usuarioCadastro = useCallback(
		async (data: cadastroUsuario) => {
			try {
				// ESVAZIA A LISTA DE ERROS
				formRef.current?.setErrors({});

				// INFORMAMOS COMO IREMOS RECEBER OS DADOS
				const schema = Yup.object().shape({
					// REGRAS DE VALIDACAO
					nome: Yup.string().required('Nome obrigatório!'),
					email: Yup.string().required('E-mail obrigatório!').email('E-mail inválido!'),
					senha: Yup.string().required('Senha obrigatória!').min(6, 'No mínimo 6 dígitos'),
				});

				// OQUE DEVE ACONTECER SE PASSAR PELAS REGRAS DE NEGOCIO
				await schema.validate(data, {
					// FAZ TRAZER TODOS OS ERROS
					abortEarly: false,
				});

				await Api.post('/usuarios', data);

				// ENVIA UMA MENSAGEM COM ESTE TITULO E DESCRICAO
				Alert.alert('Cadastro realizado!', 'Você já pode fazer seu logon no GoBarber!');

				// FAZ ACESSAR A PAGINA DE LOGIN
				navegacao.navigate('LoginPagina');
			} catch (err) {
				// CHAMA A IMPORTCAO PARA DAR UMA TRATIVA NOS ERROS
				// const resultado = ValidacaoErroUtilizario(err);

				// ENVIA AS TRATATIVAS EXISTENTES
				// formRef.current?.setErrors(resultado);
				if (err instanceof Yup.ValidationError) {
					const resultado = ValidacaoErroUtilizario(err);

					formRef.current?.setErrors(resultado);

					return;
				}

				Alert.alert(
					'Erro no cadastro',
					'Ocorreu um erro ao fazer cadastro, tente novamente',
				);
			}
		},
		[navegacao],
	);

	return (
		<>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				// IDENTIFICA QUAL E O SISTEMA OPERACIONAL
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				enabled
			>
				<ScrollView
					// FECHA O TECLADO AO CLICAR FORA DO CAMPO DE DIGITACAO
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{ flex: 1 }}
				>
					<Container>
						<Image source={logoImagem} />

						<View>
							<Titulo>Crie sua conta</Titulo>
						</View>

						<Form ref={formRef} onSubmit={usuarioCadastro}>
							<InputComponente
								nome="nome"
								icone="user"
								placeholder="Nome"
								autoCorrect={false}
								// PRIMEIRA LETRA DE CADA PALAVRA EM CAIXA ALTA
								autoCapitalize="words"
								returnKeyType="next"
								onSubmitEditing={() => {
									emailInputRef.current?.focus();
								}}
							/>
							<InputComponente
								ref={emailInputRef}
								nome="email"
								icone="mail"
								placeholder="E-mail"
								autoCorrect={false}
								autoCapitalize="none"
								keyboardType="email-address"
								returnKeyType="next"
								onSubmitEditing={() => {
									senhaInputRef.current?.focus();
								}}
							/>
							<InputComponente
								ref={senhaInputRef}
								nome="senha"
								icone="lock"
								placeholder="Senha"
								secureTextEntry
								// BLOQUEA A CHEGARACAO AUTOMATICA DE SENHA DO SISTEMA
								textContentType="newPassword"
								returnKeyType="send"
								onSubmitEditing={() => formRef.current?.submitForm()}
							/>

							<BotaoComponente onPress={() => formRef.current?.submitForm()}>
								Entrar
							</BotaoComponente>
						</Form>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>

			<Voltar
				onPress={() => {
					// ENVIA PARA UMA PAGINA ESPECIFICA
					navegacao.navigate('LoginPagina');
				}}
			>
				<IconeFeather name="arrow-left" size={20} color="#ffffff" />

				<VoltarTexto>Voltar para login</VoltarTexto>
			</Voltar>
		</>
	);
};

export default Cadastro;
