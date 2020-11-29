import { ValidationError } from 'yup';

// CRIA UMA TIPAGEM TIPO STRING PARA TODOS OS CAMPOS
interface Tipagem {
	[campo: string]: string;
}

export default function ValidacaoErro(err: ValidationError): Tipagem {
	// CRIA UM LOCAL PARA SALVAR AS INFORMACOES
	const verificacao: Tipagem = {};

	// PEGA SOMENTE AS INFORMACOES QUE NOS DESEJA
	err.inner.forEach(error => {
		verificacao[error.path] = error.message;
	});

	// ENVIA AS INFORMACOES RECUPERADA
	return verificacao;
}
