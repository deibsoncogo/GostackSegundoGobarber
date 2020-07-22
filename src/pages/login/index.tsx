import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import { Container, Conteudo, Background } from './styles';
import LogoImagem from '../../assets/logo.svg';

const Login: React.FC = () => (
	<Container>
		<Conteudo>
			<img src={LogoImagem} alt="Logo da Gobarber" />

			<form>
				<h1>Faça seu logon</h1>

				<input placeholder="E-mail" />
				<input type="password" placeholder="Senha" />

				<button type="submit">Entrar</button>

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
