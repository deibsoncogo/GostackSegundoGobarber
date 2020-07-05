import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export default class ImplementandoProfissionalID1593901255166
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		// REALIZA A EXCLUCAO DA COLUNA INFORMADA
		await queryRunner.dropColumn('agendamento', 'profissional');

		// CRIA UMA NOVA COLUNA
		await queryRunner.addColumn(
			'agendamento',
			new TableColumn({
				name: 'profissional_id',
				type: 'uuid',
				isNullable: true,
			}),
		);

		// CRIA UMA CHAVE ESTRANGEIRA (BANCO DE DADOS VINCULADO)
		await queryRunner.createForeignKey(
			'agendamento',
			new TableForeignKey({
				name: 'AgendamentoProfissional', // CRIA UM NOME PARA A CHAVE ESTRANGEIRA
				columnNames: ['profissional_id'], // COLUNA QUE VAI RECEBER A INFORMCAO
				referencedColumnNames: ['id'], // INFORMACAO A SER ENVIADA
				referencedTableName: 'usuario', // DE ONDE VAI TIRAR A INFORMACAO
				// AO ECLUIR A INFORMACAO NA TABELA PRINCIPAL AQUI FICARA EM BRANCO
				onDelete: 'SET NULL',
				// AO ALTERAR A INFORMACAO NA TABELA PRINCIPAL AQUI SERA ATUALIZADO
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// PARA DESFAZER O up TEMOS QUE COMECAR PELO ULTIMO COMANDO
		// DESFAZ A CHAVE ESTRANGEIRA
		await queryRunner.dropForeignKey('agendamento', 'AgendamentoProfissional');

		// DESFAZ A COLUNA CRIADA
		await queryRunner.dropColumn('agendamento', 'profissional_id');

		// CRIA A COLUNA EXCLUIDA
		await queryRunner.addColumn(
			'agendamento',
			new TableColumn({
				name: 'profissional',
				type: 'varchar',
			}),
		);
	}
}

/** STATUS PARA O onDelete e onUpdate
 * RESTRICT: NAO PERMITE NADA ACONTECER COMO EXCLUIR, ALTERAR...
 * SET NULL: DEIXA REALIZAR O COMANDO E OS RELACIONAMENTOS PODEM SER TORNAR NULO
 * CASCADE: APLICA OQUE ACONTECEU EM TODOS BANCOS DE DADOS RELACONADO
 */
