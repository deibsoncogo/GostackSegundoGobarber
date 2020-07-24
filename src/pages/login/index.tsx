import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Container, Conteudo, Background } from './styles';
import LogoImagem from '../../assets/logo.svg';
import InputComponente from '../../components/input';
import ButtonComponente from '../../components/button';

const Login: React.FC = () => (
	<Container>
		<Conteudo>
			<img src={LogoImagem} alt="Logo da Gobarber" />

			<form>
				<h1>Faça seu logon</h1>

				<InputComponente nome="email" icone={FiMail} placeholder="E-mail" />
				<InputComponente nome="senha" icone={FiLock} type="password" placeholder="Senha" />

				<ButtonComponente type="submit">Entrar</ButtonComponente>

				<a href="forgot">Esqueci minha senha</a>
			</form>

			<a href="login">
				<FiLogIn />
				Criar conta
			</a>
		</Conteudo>
		<Background />
	</Container>
);

export default Login;
