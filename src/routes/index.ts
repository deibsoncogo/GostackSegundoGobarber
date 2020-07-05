import { Router } from 'express';

// IMPORTACAO DAS ROTAS SECUNDARIAS
import AgendamentosRotas from './agendamento';
import UsuariosRotas from './usuario';

const rota = Router();

// A APLICACAO DO METODO use PERMITE QUE VARIOS OUTROS METODOS SEJAM UTILIZADOS
rota.use('/agendamentos', AgendamentosRotas);
rota.use('/usuarios', UsuariosRotas);

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
