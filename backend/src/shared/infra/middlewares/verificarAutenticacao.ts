// PARA NAO TER QUE EXPORTAR O Router E CRIAR UMA INSTANCIA PARA ELE
// REALIZAMOS ESTAS IMPORTACAOS PARA OS MESMOS FUNCIONAREM
// E DEPOIS CRIAMOS UMA ESTANCIA DELE NA FUNCAO
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AutenticacaoConfiguracao from '@config/autenticacao';
import GeralErro from '@shared/errors/geral';

interface TokenPayload {
	iat: number; // DATA AUTOMATICA DE CRIACAO
	exp: number; // DATA DA VALIDADE
	sub: string; // ID DO USUARIO
}

// AS INFORMACOES SALVAS NO REQUEST E RESPONSE FICA SALVO ATE O FINAL DO PROGRAMA
export default function autenticarSecao(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	// RECUPERA A INFORMACAO DADA NO CABECALHO
	const tokenRecebido = request.headers.authorization;

	// VERIFICA SE EXISTE ALGUMA INFORMACAO
	if (!tokenRecebido) {
		throw new GeralErro('Token JWT não informado', 401);
	}

	// DIFIDE A INFORMACAO NO CABECALHO PELO ESPACO CRIANDO UM ARRAY
	// QUANDO NAO QUEREMOS UTILIZAR UMA VARIAVEL PODEMOS DEIXAR EM BRANCO
	const [, token] = tokenRecebido.split(' ');

	try {
		const tokenDecodificado = verify(token, AutenticacaoConfiguracao.tokenjwt.segredo);

		// as OBRIGA A UTILIZACAO DA INTERFACE INFORMADA
		const { sub } = tokenDecodificado as TokenPayload;

		// CRIA ESTE CAMINHO DENTRO DO request
		request.usuario = {
			id: sub,
		};

		return next();
	} catch (err) {
		throw new GeralErro('Token JWT inválido', 401);
	}
}
