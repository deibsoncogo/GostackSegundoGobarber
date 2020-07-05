// CRIACAO DA TIPAGEM DOS DADOS GLOBALMENTE
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';

// import { uuid } from 'uuidv4';

import UsuarioModelo from './usuario'; // INSTANCIA DA CLASSE USUARIO

// O Decorator (@) COM O Entity CRIAR O VINCULO COM O BANCO DE DADOS
// ESTE METODO CRIA UM Constructor AUTOMATICAMENTE
@Entity('agendamentos')
class Agendamento {
	// DEFINE COMO COLUNA PRINCIPAL E QUE É GERADA AUTOMATICAMENTE PELO UUID
	@PrimaryGeneratedColumn('uuid')
	id: string;

	// DEFINE QUE E UMA COLUNA TIPO STRING
	@Column()
	profissional_id: string;

	// CRIA UM RELACIONAMENTO COM TODOS DADOS DO OUTRO BANCO DE DADOS
	@ManyToOne(() => UsuarioModelo) // DEFINE QUANTIDADE DE VEZES QUE PODE SER RELACIONADO
	@JoinColumn({ name: 'profissional_id' }) // DEFINE QUAL COLUNA IDENTIFICA O USUARIO
	profissional: UsuarioModelo; // PROPRIEDADE

	// DEFINE QUE E UMA COLUNA TIPO TIMESTAMP
	@Column('timestamp with time zone')
	data: Date;

	@CreateDateColumn()
	criacao: Date;

	@UpdateDateColumn()
	alteracao: Date;

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
