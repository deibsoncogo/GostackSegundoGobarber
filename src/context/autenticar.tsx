import React, { useState, useCallback, createContext } from 'react';

import ApiServico from '../services/api';

interface AutenticacaoState {
	token: string;
	usuario: object;
}

interface CredencialTipagem {
	email: string;
	senha: string;
}

interface Tipagem {
	usuario: object;
	login(credencial: CredencialTipagem): Promise<void>;
}

// FORCAMOS A INICIALIZACAO DO VALOR COM O COMANDOS as
export const Autenticar = createContext<Tipagem>({} as Tipagem);

// EXPORTCAO ISOLADA
export const AutenticacaoProvider: React.FC = ({ children }) => {
	// VAI JOGAR AS INFORMACOES SALVA NO STORAGE PRA O FRONTEND NOVAMENTE
	// CASO NAO EXISTA A INFORMACAO NO LOCAL STORAGE VAI DEIXAR EM BRANCO
	const [data, setData] = useState<AutenticacaoState>(() => {
		const token = localStorage.getItem('@GoBarber:token');
		const usuario = localStorage.getItem('@GoBarber:usuario');

		// SE EXISTIR RETORNA AS INFORMACOES SALVA
		if (token && usuario) {
			return { token, usuario: JSON.parse(usuario) };
		}

		// SE NAO EXISTIR VAI RETORNAR UM OBJETO VAZIO DE TIPO AutenticacaoState
		return {} as AutenticacaoState;
	});

	const login = useCallback(async ({ email, senha }) => {
		const response = await ApiServico.post('secoes', {
			email,
			senha,
		});

		const { token, usuario } = response.data;

		// SALVA NO LOCAL STORAGE E CONVERTE AS INFORMACOES DO USUARIO
		localStorage.setItem('@GoBarber:token', token);
		localStorage.setItem('@GoBarber:usuario', JSON.stringify(usuario));

		setData({ token, usuario });
	}, []);

	return (
		// ATIVA A UTILIZACAO DE CONTEXTO PARA OQUE ESTIVER DENTRO
		<Autenticar.Provider value={{ usuario: data.usuario, login }}>
			{children}
		</Autenticar.Provider>
	);
};

export default Autenticar;
