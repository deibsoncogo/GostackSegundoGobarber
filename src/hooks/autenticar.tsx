import React, { useState, useCallback, createContext, useContext, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import ApiServico from '../services/api';

interface AutenticacaoState {
	token: string;
	usuario: object;
}

interface CredencialTipagem {
	email: string;
	senha: string;
}

interface AutenticacaoContexto {
	usuario: object;
	carregando: boolean;
	login(credencial: CredencialTipagem): Promise<void>;
	deslogar(): void;
}

// FORCAMOS A INICIALIZACAO DO VALOR COM O COMANDOS as
const Autenticar = createContext<AutenticacaoContexto>({} as AutenticacaoContexto);

// EXPORTCAO ISOLADA
const AutenticacaoProvider: React.FC = ({ children }) => {
	// VAI JOGAR AS INFORMACOES SALVA NO STORAGE PRA O FRONTEND NOVAMENTE
	// CASO NAO EXISTA A INFORMACAO NO LOCAL STORAGE VAI DEIXAR EM BRANCO
	const [data, setData] = useState<AutenticacaoState>({} as AutenticacaoState);

	const [carregando, setCarregando] = useState(true);

	useEffect(() => {
		async function carregarStorageData(): Promise<void> {
			const [token, usuario] = await AsyncStorage.multiGet([
				'@GoBarber:token',
				'@GoBarber:usuario',
			]);

			if (token[1] && usuario[1]) {
				setData({ token: token[1], usuario: JSON.parse(usuario[1]) });
			}

			setCarregando(false);
		}

		carregarStorageData();
	}, []);

	const login = useCallback(async ({ email, senha }) => {
		const response = await ApiServico.post('secoes', {
			email,
			senha,
		});

		const { token, usuario } = response.data;

		// SALVA NO LOCAL ASYNC STORAGE OS DOIS ITENS AO MESMO TEMPO AS CONVERTENDO
		await AsyncStorage.multiSet([
			['@GoBarber:token', token],
			['@GoBarber:usuario', JSON.stringify(usuario)],
		]);

		setData({ token, usuario });
	}, []);

	// DESLOGA O USUARIO APAGANDO OS ITENS DO LOCAL STORAGE
	const deslogar = useCallback(async () => {
		// REVEMO AS INFORMACOES DE LOGIN
		await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:usuario']);

		setData({} as AutenticacaoState);
	}, []);

	return (
		// ATIVA A UTILIZACAO DE CONTEXTO PARA OQUE ESTIVER DENTRO
		<Autenticar.Provider value={{ usuario: data.usuario, carregando, login, deslogar }}>
			{children}
		</Autenticar.Provider>
	);
};

function useAutenticacao(): AutenticacaoContexto {
	const contexto = useContext(Autenticar);

	if (!contexto) {
		throw new Error('useAutenticacao deve ser usado dentro do AutenticacaoProvider');
	}

	return contexto;
}

export { AutenticacaoProvider, useAutenticacao };
