import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react'; // SING IN
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

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import BotaoComponente from '../../components/botao';
import InputComponente from '../../components/input';
import { useAutenticacao } from '../../hooks/autenticar';
import ValidacaoErroUtilizario from '../../utils/validacaoerro';

import logoImagem from '../../assets/logo.png';

import {
	Container,
	Titulo,
	AjudaSenha,
	AjudaSenhaTexto,
	CriarConta,
	CriarContaTexto,
} from './styles';

interface DadosLogin {
	email: string;
	senha: string;
}

const Login: React.FC = () => {
	// PARA MANIPULACAO UM ELEMENTO DE FORMA DIRETA
	const formRef = useRef<FormHandles>(null);

	const senhaInputRef = useRef<TextInput>(null);

	// CONTROLAR TROCA DE PAGINAS
	const navegacao = useNavigation();

	// IMPORTA OS METODOS DENTRO DO HOOK DE EUTENTICACAO
	const { login } = useAutenticacao();

	// MANIPULAR O LOGIN DO USUARIO
	const usuarioLogin = useCallback(async (data: DadosLogin) => {
		try {
			formRef.current?.setErrors({});

			const schema = Yup.object().shape({
				email: Yup.string().required('E-mail obrigatório!').email('E-mail inválido!'),
				senha: Yup.string().required('Senha obrigatória!'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			await login({
				email: data.email,
				senha: data.senha,
			});
		} catch (err) {
			// VERIFICA SE O ERRO VEM DO Yup
			if (err instanceof Yup.ValidationError) {
				const resultado = ValidacaoErroUtilizario(err);

				formRef.current?.setErrors(resultado);

				return;
			}

			Alert.alert(
				'Erro na autenticação',
				'Ocorreu um erro ao fazer login, cheque as credenciais',
			);
		}
	}, []);

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
							<Titulo>Faça seu login</Titulo>
						</View>

						<Form ref={formRef} onSubmit={usuarioLogin}>
							<InputComponente
								nome="email"
								icone="mail"
								placeholder="E-mail"
								// DESATIVA A CORRECAO DO TEXTO
								autoCorrect={false}
								// DESATIVA A LETRA MAIUSCULA
								autoCapitalize="none"
								// ATIVA O TECLADO NO MODO PARA EMAIL
								keyboardType="email-address"
								// DEFINE O ICONE AVANCAR NO BOTAO ESPECIAL
								returnKeyType="next"
								// DEFINE OQUE O BOTAO ESPECIAL DEVE EXECUTAR
								onSubmitEditing={() => {
									// AVANCA PARA O PROXIMO CAMPO COMO INPUT OU BOTAO
									senhaInputRef.current?.focus();
								}}
							/>

							<InputComponente
								ref={senhaInputRef}
								nome="senha"
								icone="lock"
								placeholder="Senha"
								// DEFINE O CAMPO PARA RECEBER SENHA
								secureTextEntry
								// DEFINE O ICONE ENVIAR NO BOTAO ESPECIAL
								returnKeyType="send"
								// DEFINE OQUE O BOTAO ESPECIAL DEVE EXECUTAR
								onSubmitEditing={() => {
									// ENVIA AS INFORMACOES
									formRef.current?.submitForm();
								}}
							/>

							<BotaoComponente
								onPress={() => {
									formRef.current?.submitForm();
								}}
							>
								Entrar
							</BotaoComponente>
						</Form>

						<AjudaSenha
							onPress={() => {
								console.log('TOMO BANHO DE LUA...');
							}}
						>
							<AjudaSenhaTexto>Esqueci minha senha</AjudaSenhaTexto>
						</AjudaSenha>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>

			<CriarConta
				onPress={() => {
					// FAZ VOLTAR PARA A UTILIMA TELA ACESSADA
					navegacao.navigate('CadastroPagina');
				}}
			>
				<IconeFeather name="log-in" size={20} color="#ff9000" />

				<CriarContaTexto>Criar uma conta</CriarContaTexto>
			</CriarConta>
		</>
	);
};

export default Login;
