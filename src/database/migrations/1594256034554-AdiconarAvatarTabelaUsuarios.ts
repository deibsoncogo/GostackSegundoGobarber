import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AdiconarAvatarTabelaUsuarios1594256034554
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		// CRIA UMA COLUNA NA TABELA usuarios
		await queryRunner.addColumn(
			'usuarios',
			// ESTA NOVA COLUNA POSSUIRA ESTAS CONFIGURACOES
			new TableColumn({
				name: 'avatar',
				type: 'varchar',
				isNullable: true, // DEVEMOS PERMITIR CAMPO VAZIO
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('usuarios', 'avatar');
	}
}

/** !!! ATENCAO !!!
 * DEVEMOS PERMITIR QUE A COLUNA POSSUIA CELULAS VAZIAS
 * DEVEMOS FAZER ISSO SE EXISTIR ALGUMA INFORMACAO SALVA NO BANCO DE DADOS
 *
 * CASO CONTRARIO DEVEMOS CRIAR UM COMANDO PARA ALIMENTAR ESTAS CELULAS VAZIA
 * UMA METODO INTERESSANTE E OBRIGAR O USUARIO A ALIMENTAR ESTE CAMPO NOVO
 * QUANDO ELE LOGAR NOVAMENTE
 */
