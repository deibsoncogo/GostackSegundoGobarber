import { createContext } from 'react';

interface Tipagem {
	nome: string;
}

// FORCAMOS A INICIALIZACAO DO VALOR COM O COMANDOS as
const Autenticar = createContext<Tipagem>({} as Tipagem);

export default Autenticar;
