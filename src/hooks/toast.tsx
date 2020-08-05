import React, { createContext, useContext, useCallback } from 'react';

import ToastComponente from '../components/toast';

interface ToastContextTipagem {
	adicionarToast(): void;
	removerToast(): void;
}

const ToastContext = createContext<ToastContextTipagem>({} as ToastContextTipagem);

const ToastProvider: React.FC = ({ children }) => {
	const adicionarToast = useCallback(() => {
		console.log('adicionarToast');
	}, []);

	const removerToast = useCallback(() => {
		console.log('removerToast');
	}, []);

	return (
		<ToastContext.Provider value={{ adicionarToast, removerToast }}>
			{children}
			<ToastComponente />
		</ToastContext.Provider>
	);
};

function useToast(): ToastContextTipagem {
	const contexto = useContext(ToastContext);

	if (!contexto) {
		throw new Error('useToast deve ser usado dentro do ToastProvider');
	}

	return contexto;
}

export { ToastProvider, useToast };
