import React from 'react';
import { Switch } from 'react-router-dom';

import CadastroPagina from '../pages/cadastro';
import InicialPagina from '../pages/inicial';
import LoginPagina from '../pages/login';

import Rota from './rota';

const Rotas: React.FC = () => {
	return (
		<Switch>
			<Rota path="/" exact component={LoginPagina} />
			<Rota path="/cadastro" exact component={CadastroPagina} />

			{/* isPrivada VAI NOS FALAR QUE O USUARIO PRECISA ESTAR LOGADO PARA ACESSAR */}
			<Rota path="/inicial" exact component={InicialPagina} isPrivada />
		</Switch>
	);
};

export default Rotas;
