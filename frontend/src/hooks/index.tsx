import React from 'react';

import { AutenticacaoProvider } from './autenticar';
import { ToastProvider } from './toast';

const ProviderGlobal: React.FC = ({ children }) => (
	// ATIVACAO DO PROVIDER
	<AutenticacaoProvider>
		<ToastProvider>{children}</ToastProvider>
	</AutenticacaoProvider>
);

export default ProviderGlobal;

/** ANOTACOES
 * ARQUIVO MESTRE DE TODOS PROVIDER
 * ESTE ARQUIVO VAI ATIVAR TODOS PROVIDER INFORMADO
 * A SEGUENCIA DE ATIVACAO DOS PROVIDER TANTO FAZ
 * EXECETO QUANDO UM PROVIDER PRECISA DO OUTRO PARA EXECUTAR
 * POR FIM ESTE ARQUIVO VAI DIMINUIR A QUANTIDADE DE CODIGOS NO ARQUIVO App.tsx
 */
