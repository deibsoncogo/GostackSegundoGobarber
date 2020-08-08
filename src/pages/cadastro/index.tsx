import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import Api from '../../services/api';

import { Container, Conteudo, Animacao, Background } from './styles';
import LogoImagem from '../../assets/logo.svg';
import InputComponente from '../../components/input';
import ButtonComponente from '../../components/button';

import ValidacaoErroUtilizario from '../../utils/validacaoerro';
import { useToast } from '../../hooks/toast';

interface cadastroUsuario {
	nome: string;
	email: string;
	senha: string;
}

// FUNCAO PARA REALIZAR A VALIDACAO DO USUARIO
const Cadastro: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const { adicionarToast } = useToast();
	const historico = useHistory();

	// FUNCAO QUE VAI EXECUTAR SOMENTE UMA FEZ
	const usuarioSubmit = useCallback(
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

				historico.push('/');

				adicionarToast({
					tipo: 'sucesso',
					titulo: 'Cadastro realizado!',
					descricao: 'Você já pode fazer seu logon no GoBarber!',
				});
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

				adicionarToast({
					tipo: 'erro',
					titulo: 'Erro no cadastro',
					descricao: 'Ocorreu um erro ao fazer cadastro, tente novamente',
				});
			}
		},
		[adicionarToast, historico],
	);

	return (
		<Container>
			<Background />
			<Conteudo>
				<Animacao>
					<img src={LogoImagem} alt="Logo da Gobarber" />

					{/* CRIA UM VALOR INICIAL DO CAMPO */}
					<Form
						ref={formRef}
						initialData={{ nome: 'Deibson Cogo' }}
						onSubmit={usuarioSubmit}
					>
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

					<Link to="/">
						<FiArrowLeft />
						Voltar para logon
					</Link>
				</Animacao>
			</Conteudo>
		</Container>
	);
};

export default Cadastro;
