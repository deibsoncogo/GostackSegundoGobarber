export default class Geral {
	// SALVA A MENSAGEM NO FORMATO DE TEXTO
	public readonly mensagem: string;

	// RECEBE O CODIGO DE ERRO DO ESTADO HTTP
	public readonly status: number;

	// CASO NAO POSSUA CODIGO DE ERRO DEFINIR COMO 400
	constructor(mensagem: string, status = 400) {
		// DEFINE VALOR DE INICIALIZACAO
		this.mensagem = mensagem;
		this.status = status;
	}
}

/** O readonly BLOQUEA O METODO ABAIXO
 * Geral.mensagem = ""
 */
