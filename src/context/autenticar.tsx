import React, { useCallback, createContext } from 'react';

import ApiServico from '../services/api';

interface CredencialTipagem {
	email: string;
	senha: string;
}

interface Tipagem {
	nome: string;
	login(credencial: CredencialTipagem): Promise<void>;
}

// FORCAMOS A INICIALIZACAO DO VALOR COM O COMANDOS as
export const Autenticar = createContext<Tipagem>({} as Tipagem);

// EXPORTCAO ISOLADA
export const AutenticacaoProvider: React.FC = ({ children }) => {
	const login = useCallback(async ({ email, senha }) => {
		const resposta = await ApiServico.post('secoes', {
			email,
			senha,
		});

		console.log(resposta.data);
	}, []);

	return (
		// ATIVA A UTILIZACAO DE CONTEXTO PARA OQUE ESTIVER DENTRO
		<Autenticar.Provider value={{ nome: 'Deibson Cogo', login }}>
			{children}
		</Autenticar.Provider>
	);
};

export default Autenticar;
