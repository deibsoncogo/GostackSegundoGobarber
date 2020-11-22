import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useAutenticacao } from '../hooks/autenticar';

import AutenticadoRota from './autenticado'; // app.routes.tsx
import AutenticarRota from './autenticar'; // auth.routes.tsx

const Rota: React.FC = () => {
	const { usuario, carregando } = useAutenticacao();

	// FAZ APARECER UM TEMPORISADOR ENQUANTO A API AUTENTICA O USUARIO
	if (carregando) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#99999" />
			</View>
		);
	}

	// DEFINE QUAL GRUPO O USUARIO VAI ACESSAR
	// AS PAGINAS QUE PRECISA DE AUTENTICACAO OU NAO
	return usuario ? <AutenticadoRota /> : <AutenticarRota />;
};

export default Rota;
