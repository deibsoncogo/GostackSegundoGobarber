// CRIACAO DA TIPAGEM DOS DADOS GLOBALMENTE
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// import { uuid } from 'uuidv4';

// O Decorator (@) COM O Entity CRIAR O VINCULO COM O BANCO DE DADOS
// ESTE METODO CRIA UM Constructor AUTOMATICAMENTE
@Entity('agendamentos')
class Agendamento {
	// DEFINE COMO COLUNA PRINCIPAL E QUE É GERADA AUTOMATICAMENTE PELO UUID
	@PrimaryGeneratedColumn('uuid')
	id: string;

	// DEFINE QUE E UMA COLUNA TIPO STRING
	@Column()
	profissional: string;

	// DEFINE QUE E UMA COLUNA TIPO TIMESTAMP
	@Column('timestamp with time zone')
	data: Date;

	// ESTE METODO SERVE PARA CRIAR NOVAS INFORMACOES
	// Omit SERVE PARA FALAR QUE CERTO ITEM NAO E PREENCHIDO PELO USUARIO
	// constructor({ profissional, data }: Omit<Agendamento, 'id'>) {
	// 	// DEVEMOS DEFINIR UM VALOR DE INICIALIZACAO
	// 	this.id = uuid();
	// 	this.profissional = profissional;
	// 	this.data = data;
	// }
}

export default Agendamento;

// CRIACAO DA TIPAGEM DOS DADOS LOCAL
// interface Agendamento {
// 	id: string;
// 	profissional: string;
// 	data: Date;
// }
