import { Router } from 'express';

// IMPORTACAO DAS ROTAS SECUNDARIAS
import AgendamentoRota from './agendamento';
import UsuarioRota from './usuario';

const rota = Router();

// A APLICACAO DO METODO use PERMITE QUE VARIOS OUTROS METODOS SEJAM UTILIZADOS
rota.use('/agendamento', AgendamentoRota);
rota.use('/usuario', UsuarioRota);

export default rota;

/** EXPLICACAO DESTE ARQUIVO index
 * UTILIZAMOS ELE PARA VINCULAR COM TODOS ARQUIVOS DE ROTA
 * MELHORA A LEITURA DOS CODIGOS POIS FICA AGRUPADO
 * EVITA QUE O ARQUIVO FIQUE CHEIO DE CODIGOS
 */

/** OS ARQUIVOS DE ROTAS SERVE PARA
 * RECEBER UMA REQUISICAO
 * CHAMAR OUTRO ARQUIVO
 * DEVOLVER UMA REPOSTA
 */
