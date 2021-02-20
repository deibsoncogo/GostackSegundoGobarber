import { Router } from 'express';

import SecaoController from '../controllers/secaoController';

const secaoRota = Router();
const secaoController = new SecaoController();

secaoRota.post('/', secaoController.criar);

export default secaoRota;
