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

	@CreateDateColumn()
	criacao: Date;

	@UpdateDateColumn()
	alteracao: Date;
}

export default Usuario;
