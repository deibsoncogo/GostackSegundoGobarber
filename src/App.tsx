import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalEstilo from './styles/global';

import AppProvider from './hooks';

import Rota from './routes';

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
