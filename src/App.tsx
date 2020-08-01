import React from 'react';

import GlobalEstilo from './styles/global';
import LoginPagina from './pages/login';
import CadastroPagina from './pages/cadastro';

import AutenticarContexto from './context/autenticar';

/* eslint-disable */
const App: React.FC = () => (
	<>
		{/* ATIVA A UTILIZACAO DE CONTEXTO PARA OQUE ESTIVER DENTRO */}
		<AutenticarContexto.Provider value={{ nome: 'Deibson' }}>
			<LoginPagina />
			<CadastroPagina />
		</AutenticarContexto.Provider>
		<GlobalEstilo />
	</>
);

	export default App;
