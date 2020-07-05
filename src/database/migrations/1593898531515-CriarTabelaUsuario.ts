import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CriarTabelaUsuario1593898531515 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'usuario',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'nome',
						type: 'varchar',
					},
					{
						name: 'email',
						type: 'varchar',
						isUnique: true, // NAO VAI ACEITAR DADOS DUPLICADO
					},
					{
						name: 'senha',
						type: 'varchar',
					},
					{
						name: 'criacao',
						type: 'timestamp',
						default: 'now()', // DEVEMOS DEFINIR ESTE VALOR PARA AS COLUNA AUTOMATICAS
					},
					{
						name: 'alteracao',
						type: 'timestamp',
						default: 'now()',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('usuario');
	}
}
