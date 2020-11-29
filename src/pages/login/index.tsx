import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import ButtonComponente from '../../components/button';
import InputComponente from '../../components/input';
import { useAutenticacao } from '../../hooks/autenticar';
import { useToast } from '../../hooks/toast';
import ValidacaoErroUtilizario from '../../utils/validacaoerro';

import LogoImagem from '../../assets/logo.svg';

import { Container, Conteudo, Animacao, Background } from './styles';

interface DadosLogin {
	email: string;
	senha: string;
}

const Login: React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const { login } = useAutenticacao();
	const { adicionarToast } = useToast();

	const historico = useHistory();

	const usuarioSubmit = useCallback(
		async (data: DadosLogin) => {
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

				historico.push('/inicial');
			} catch (err) {
				// VERIFICA SE O ERRO VEM DO Yup
				if (err instanceof Yup.ValidationError) {
					const resultado = ValidacaoErroUtilizario(err);

					formRef.current?.setErrors(resultado);

					return;
				}

				adicionarToast({
					tipo: 'erro',
					titulo: 'Erro na autenticação',
					descricao: 'Ocorreu um erro ao fazer login, cheque as credenciais',
				});
			}
		},
		[login, adicionarToast, historico],
	);

	return (
		<Container>
			<Conteudo>
				<Animacao>
					<img src={LogoImagem} alt="Logo da Gobarber" />

					<Form ref={formRef} onSubmit={usuarioSubmit}>
						<h1>Faça seu logon</h1>

						<InputComponente nome="email" icone={FiMail} placeholder="E-mail" />
						<InputComponente
							nome="senha"
							icone={FiLock}
							type="password"
							placeholder="Senha"
						/>

						<ButtonComponente type="submit">Entrar</ButtonComponente>

						<a href="forgot">Esqueci minha senha</a>
					</Form>

					<Link to="/cadastro">
						<FiLogIn />
						Criar conta
					</Link>
				</Animacao>
			</Conteudo>
			<Background />
		</Container>
	);
};

export default Login;
