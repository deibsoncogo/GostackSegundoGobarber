import React from 'react';

import GlobalEstilo from './styles/global';
import LoginPagina from './pages/login';
import CadastroPagina from './pages/cadastro';

import ToastComponente from './components/toast';
import { AutenticacaoProvider } from './hooks/autenticar';

/* eslint-disable */
const App: React.FC = () => (
	<>
		{/* DEFINE OQUE VAI TER ACESSO AO CONTEXTO */}
		<AutenticacaoProvider>
			<LoginPagina />
			<CadastroPagina />
		</AutenticacaoProvider>

		<ToastComponente />

		<GlobalEstilo />
	</>
);

export default App;
