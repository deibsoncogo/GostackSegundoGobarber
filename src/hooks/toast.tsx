import React, { createContext, useContext, useCallback, useState } from 'react';

import { uuid } from 'uuidv4';

import ToastComponente from '../components/toast';

// EXPORTACAO PARA PODER UTILIZAR A MESMA TIPAGEM EM OUTROS ARQUIVOS
export interface MensagemTipagem {
	id: string;
	tipo?: 'informacao' | 'sucesso' | 'erro';
	titulo: string;
	descricao?: string;
}

interface ToastContextTipagem {
	adicionarToast(mensagem: Omit<MensagemTipagem, 'id'>): void;
	removerToast(id: string): void;
}

const ToastContext = createContext<ToastContextTipagem>({} as ToastContextTipagem);

const ToastProvider: React.FC = ({ children }) => {
	// UM ARRAY DO useState NAO CONSEGUE DEFINIR UMA TIPAGEM SEM UMA Interface
	const [mensagem, setMensagem] = useState<MensagemTipagem[]>([]);

	const adicionarToast = useCallback(
		// O Omit NAO DEIXA RECEBER UM ID PELO USUARIO
		({ tipo, titulo, descricao }: Omit<MensagemTipagem, 'id'>) => {
			// ATIVA A UTILIZACAO DA DEPENDENCIA
			const id = uuid();

			const toast = {
				id,
				tipo,
				titulo,
				descricao,
			};

			// NESTE METODO NAO PRECISAMOS INFORMAR A VARIAVEL NO FINAL DA FUNCAO
			// setMensagem([...mensagem, toast]);
			setMensagem(oldMessagem => [...oldMessagem, toast]);
		},
		// [mensagem],
		[],
	);

	const removerToast = useCallback((id: string) => {
		setMensagem(oldMessagem => oldMessagem.filter(informacao => informacao.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ adicionarToast, removerToast }}>
			{children}
			<ToastComponente mensagem={mensagem} />
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
