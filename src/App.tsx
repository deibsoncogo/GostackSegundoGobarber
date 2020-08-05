import React from 'react';

import GlobalEstilo from './styles/global';
import LoginPagina from './pages/login';
import CadastroPagina from './pages/cadastro';

import AppProvider from './hooks';

/* eslint-disable */
const App: React.FC = () => (
	<>
		{/* DEFINE OQUE VAI TER ACESSO AO CONTEXTO */}
		<AppProvider>
			<LoginPagina />
			<CadastroPagina />
		</AppProvider>

		<GlobalEstilo />
	</>
);

export default App;
