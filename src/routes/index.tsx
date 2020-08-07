import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginPagina from '../pages/login';
import CadastroPagina from '../pages/cadastro';

const Rotas: React.FC = () => {
	return (
		<Switch>
			<Route path="/" exact component={LoginPagina} />
			<Route path="/cadastro" exact component={CadastroPagina} />
		</Switch>
	);
};

export default Rotas;
