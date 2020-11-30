import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'; // auth.routes.tsx

import CadastroPagina from '../pages/cadastro';
import LoginPagina from '../pages/login';

// NAVEGACAO DE AUTENTICACAO DO USUARIO
const CreateStackNavigator = createStackNavigator();

const Autenticar: React.FC = () => (
	<CreateStackNavigator.Navigator
		// EDITAR A ESTILISACAO PADRAO DO NavigationContainer
		screenOptions={{
			// DESATIVA O CABECALHO
			headerShown: false,
			// MUDA A COR DE FUNDO
			cardStyle: { backgroundColor: '#312e38' },
		}}
		// DEFINE UMA PAGINA INICIAL
		initialRouteName="LoginPagina"
	>
		<CreateStackNavigator.Screen name="LoginPagina" component={LoginPagina} />
		<CreateStackNavigator.Screen name="CadastroPagina" component={CadastroPagina} />
	</CreateStackNavigator.Navigator>
);

export default Autenticar;
