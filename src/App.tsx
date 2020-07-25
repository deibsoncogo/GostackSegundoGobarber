import React from 'react';

import GlobalEstilo from './styles/global';
import LoginPagina from './pages/login';
import CadastroPagina from './pages/cadastro';

/* eslint-disable */
const App: React.FC = () => (
	<>
		{/* <LoginPagina /> */}
		<CadastroPagina />
		<GlobalEstilo />
  </>
);

export default App;
