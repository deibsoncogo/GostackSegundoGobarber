import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from './hooks';

import Rota from './routes';

import GlobalEstilo from './styles/global';

/* eslint-disable */
const App: React.FC = () => (
	<Router>
		{/* DEFINE OQUE VAI TER ACESSO AO CONTEXTO */}
		<AppProvider>
			<Rota />
		</AppProvider>

		<GlobalEstilo />
	</Router>
);

export default App;
