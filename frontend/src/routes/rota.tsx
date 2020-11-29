import React from 'react';
import {
	RouteProps as ReactDomRotaPropriedade,
	Route as ReactDomRota,
	Redirect,
} from 'react-router-dom';

import { useAutenticacao } from '../hooks/autenticar';

interface RotaPropriedade extends ReactDomRotaPropriedade {
	isPrivada?: boolean;
	component: React.ComponentType;
}

const Rota: React.FC<RotaPropriedade> = ({
	isPrivada = false,
	component: Component,
	...rest
}) => {
	const { usuario } = useAutenticacao();

	return (
		<ReactDomRota
			{...rest}
			render={({ location }) => {
				return isPrivada === !!usuario ? (
					<Component />
				) : (
					<Redirect
						to={{ pathname: isPrivada ? '/' : '/inicial', state: { from: location } }}
					/>
				);
			}}
		/>
	);
};

export default Rota;
