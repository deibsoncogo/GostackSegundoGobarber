import { Router } from 'express';

// IMPORTACAO DAS ROTAS SECUNDARIAS
import AgendamentosRotas from './agendamentos';

const rota = Router();

// A APLICACAO DO METODO use PERMITE QUE VARIOS OUTROS METODOS SEJAM UTILIZADOS
rota.use('/agendamentos', AgendamentosRotas);

export default rota;

/** EXPLICACAO DESTE ARQUIVO index
 * UTILIZAMOS ELE PARA VINCULAR COM TODOS ARQUIVOS DE ROTA
 * MELHORA A LEITURA DOS CODIGOS POIS FICA AGRUPADO
 * EVITA QUE O ARQUIVO FIQUE CHEIO DE CODIGOS
 */
