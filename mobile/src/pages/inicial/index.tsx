import React from 'react';
import { View, Button } from 'react-native';

import { useAutenticacao } from '../../hooks/autenticar';

const Inicial: React.FC = () => {
	const { deslogar } = useAutenticacao();

	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<Button title="SAIR" onPress={deslogar} />
		</View>
	);
};

export default Inicial;
