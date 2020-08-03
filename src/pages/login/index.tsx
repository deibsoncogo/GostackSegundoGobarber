import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Container, Conteudo, Background } from './styles';
import LogoImagem from '../../assets/logo.svg';
import InputComponente from '../../components/input';
import ButtonComponente from '../../components/button';

import ValidacaoErroUtilizario from '../../utils/validacaoerro';
import { useAutenticacao } from '../../hooks/autenticar';

interface DadosLogin {
	email: string;
	senha: string;
}

const Login: React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const { login } = useAutenticacao();

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

				login({
					email: data.email,
					senha: data.senha,
				});
			} catch (err) {
				const resultado = ValidacaoErroUtilizario(err);

				formRef.current?.setErrors(resultado);
			}
		},
		[login],
	);

	return (
		<Container>
			<Conteudo>
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

				<a href="login">
					<FiLogIn />
					Criar conta
				</a>
			</Conteudo>
			<Background />
		</Container>
	);
};

export default Login;
