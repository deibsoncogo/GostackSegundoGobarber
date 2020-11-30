import React from 'react';

import { AutenticacaoProvider } from './autenticar';

const ProviderGlobal: React.FC = ({ children }) => (
	<AutenticacaoProvider>{children}</AutenticacaoProvider>
);

export default ProviderGlobal;
