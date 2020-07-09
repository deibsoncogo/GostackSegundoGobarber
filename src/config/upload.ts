import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

export default {
	// DIFINICAO DO QUE FAZER COM O ARQUIVO RECEBIDO COM O multer
	storage: multer.diskStorage({
		// LOCAL DE SALVAMENTO
		destination: path.resolve(__dirname, '..', '..', 'tmp'),
		// SERVE PARA MANIPULAR O NOME DO ARQUIVO
		filename(request, file, callback) {
			// CRIA UM CODIGO ALEATORIO PARA O ARQUIVO
			const codigoAleatorio = crypto.randomBytes(10).toString('hex');
			// CONCATENA O CODIGO ALEATORIO COM O NOME ORIGINAL DO ARQUIVO
			const arquivoFinal = `${codigoAleatorio}-${file.originalname}`;

			// DEFINE OQUE PODE SER RETORNARDO
			return callback(null, arquivoFinal);
		},
	}),
};
