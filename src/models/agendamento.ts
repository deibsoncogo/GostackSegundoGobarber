// CRIACAO DA TIPAGEM DOS DADOS GLOBALMENTE
import { uuid } from 'uuidv4';

class Agendamento {
	id: string;

	profissional: string;

	data: Date;

	// ESTE METODO SERVE PARA CRIAR NOVAS INFORMACOES
	// Omit SERVE PARA FALAR QUE CERTO ITEM NAO E PREENCHIDO PELO USUARIO
	constructor({ profissional, data }: Omit<Agendamento, 'id'>) {
		// DEVEMOS DEFINIR UM VALOR DE INICIALIZACAO
		this.id = uuid();
		this.profissional = profissional;
		this.data = data;
	}
}

export default Agendamento;

// CRIACAO DA TIPAGEM DOS DADOS LOCAL
// interface Agendamento {
// 	id: string;
// 	profissional: string;
// 	data: Date;
// }
