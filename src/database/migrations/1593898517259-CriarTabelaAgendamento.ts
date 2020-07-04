import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CriarTabelaAgendamento1593898517259 implements MigrationInterface {
	// METODO PARA GERAR CRIACOES E ALTERACOES
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'agendamentos', // NOME DA TABELA
				columns: [
					{
						name: 'id', // NOME DA COLUNA
						type: 'varchar', // TIPO PARA DADOS COMPLEXO
						isPrimary: true, // COLUNA PRINCIPAL
						generationStrategy: 'uuid', // DEFINE O TIPO DE DADO
						default: 'uuid_generate_v4()', // ADICIONA A FUNCAO DO uuidv4
					},
					{
						name: 'profissional',
						type: 'varchar',
						isNullable: false, // DEFINE QUE PRECISA CONTER ALGUMA INFORMACAO
					},
					{
						name: 'data',
						type: 'timestamp with time zone',
						isNullable: false,
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
		// METODO PARA DESFAZER ITENS DO METODO up
		await queryRunner.dropTable('agendamentos');
	}
}
