import React, { useCallback } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Container, Conteudo, Background } from './styles';
import LogoImagem from '../../assets/logo.svg';
import InputComponente from '../../components/input';
import ButtonComponente from '../../components/button';

// FUNCAO PARA REALIZAR A VALIDACAO DO USUARIO
const Cadastro: React.FC = () => {
	// FUNCAO QUE VAI EXECUTAR SOMENTE UMA FEZ
	const usuarioSubmit = useCallback(async (data: object) => {
		try {
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
		} catch (err) {
			console.log(err);
		}
	}, []);

	return (
		<Container>
			<Background />
			<Conteudo>
				<img src={LogoImagem} alt="Logo da Gobarber" />

				{/* CRIA UM VALOR INICIAL DO CAMPO */}
				<Form initialData={{ nome: 'Deibson Cogo' }} onSubmit={usuarioSubmit}>
					<h1>Faça seu cadastro</h1>

					<InputComponente nome="nome" icone={FiUser} placeholder="Nome e sobrenome" />
					<InputComponente nome="email" icone={FiMail} placeholder="E-mail" />
					<InputComponente
						nome="senha"
						icone={FiLock}
						type="password"
						placeholder="Senha"
					/>

					<ButtonComponente type="submit">Cadastrar</ButtonComponente>
				</Form>

				<a href="cadastro">
					<FiArrowLeft />
					Voltar para logon
				</a>
			</Conteudo>
		</Container>
	);
};

export default Cadastro;
