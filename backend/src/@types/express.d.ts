// DEFINE QUAL EXTENCAO QUER CRIAR UMA TIPAGEM
declare namespace Express {
	// ESCOLHE EM QUAL TIPO DESEJA INCLUIR
	export interface Request {
		// CRIA UM GRUPO
		usuario: {
			// CRIA UM CAMPO COM ESTE FORMATO
			id: string;
		};
	}
}
