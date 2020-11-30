import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'; // app.routes.tsx

import InicialPagina from '../pages/inicial';

const CreateStackNavigator = createStackNavigator();

const Autenticado: React.FC = () => (
	<CreateStackNavigator.Navigator
		screenOptions={{
			headerShown: false,
			cardStyle: { backgroundColor: '#312e38' },
		}}
		initialRouteName="InicialPagina"
	>
		<CreateStackNavigator.Screen name="InicialPagina" component={InicialPagina} />
	</CreateStackNavigator.Navigator>
);

export default Autenticado;
