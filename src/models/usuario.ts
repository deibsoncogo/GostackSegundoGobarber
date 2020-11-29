import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
class Usuario {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	nome: string;

	@Column()
	email: string;

	@Column()
	senha: string;

	@Column()
	avatar: string;

	// EXTENCAO DE GERACAO DE DATA E HORA AUTOMATICA NA CRIACAO
	@CreateDateColumn()
	criacao: Date;

	// EXTENCAO DE GERACAO DE DATA E HORA AUTOMATICA NA ALTERCAO
	@UpdateDateColumn()
	alteracao: Date;
}

export default Usuario;
