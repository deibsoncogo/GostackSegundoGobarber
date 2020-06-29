// CRIACAO DA TIPAGEM DOS DADOS GLOBALMENTE
import { uuid } from 'uuidv4';

class Agendamento {
	id: string;

	profissional: string;

	data: Date;

	// ESTE METODO SERVE PARA CRIAR NOVAS INFORMACOES
	constructor(profissional: string, data: Date) {
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
