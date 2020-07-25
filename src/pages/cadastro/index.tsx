import React from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';

import { Container, Conteudo, Background } from './styles';
import LogoImagem from '../../assets/logo.svg';
import InputComponente from '../../components/input';
import ButtonComponente from '../../components/button';

const Cadastro: React.FC = () => (
	<Container>
		<Background />
		<Conteudo>
			<img src={LogoImagem} alt="Logo da Gobarber" />

			<form>
				<h1>Faça seu cadastro</h1>

				<InputComponente nome="nome" icone={FiUser} placeholder="Nome e sobrenome" />
				<InputComponente nome="email" icone={FiMail} placeholder="E-mail" />
				<InputComponente nome="senha" icone={FiLock} type="password" placeholder="Senha" />

				<ButtonComponente type="submit">Cadastrar</ButtonComponente>
			</form>

			<a href="cadastro">
				<FiArrowLeft />
				Voltar para logon
			</a>
		</Conteudo>
	</Container>
);

export default Cadastro;
