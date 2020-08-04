import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { Container, Mensagem } from './styles';

const Toast: React.FC = () => {
	return (
		<Container>
			{/* temDescricao ASSIM RECEBE VALOR COMO true */}
			<Mensagem temDescricao>
				<FiAlertCircle size={20} />

				<div>
					<strong>Aconteceu um erro</strong>
					<p>Não foi possível fazer login na aplicação</p>
				</div>

				<button type="button">
					<FiXCircle size={18} />
				</button>
			</Mensagem>

			<Mensagem temDescricao={false} tipo="sucesso">
				<FiAlertCircle size={20} />

				<div>
					<strong>Aconteceu um erro</strong>
					{/* <p>Não foi possível fazer login na aplicação</p> */}
				</div>

				<button type="button">
					<FiXCircle size={18} />
				</button>
			</Mensagem>

			<Mensagem temDescricao tipo="erro">
				<FiAlertCircle size={20} />

				<div>
					<strong>Aconteceu um erro</strong>
					<p>Não foi possível fazer login na aplicação</p>
				</div>

				<button type="button">
					<FiXCircle size={18} />
				</button>
			</Mensagem>
		</Container>
	);
};

export default Toast;
