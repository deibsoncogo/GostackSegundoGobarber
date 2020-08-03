import React from 'react';

import GlobalEstilo from './styles/global';
import LoginPagina from './pages/login';
import CadastroPagina from './pages/cadastro';

import { AutenticacaoProvider } from './hooks/autenticar';

/* eslint-disable */
const App: React.FC = () => (
	<>
		{/* DEFINE OQUE VAI TER ACESSO AO CONTEXTO */}
		<AutenticacaoProvider>
			<LoginPagina />
			<CadastroPagina />
		</AutenticacaoProvider>
		<GlobalEstilo />
	</>
);

	export default App;
