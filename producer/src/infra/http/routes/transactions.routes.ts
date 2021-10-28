import { Router } from 'express';

import { CreateTransactionsController } from '@/useCases/createTransactions/CreateTransactionsController';
import { GetTransactionStatusController } from '@/useCases/getTransactionStatus/GetTransactionStatusController';

export const transactionsRoutes = Router();

const createTransactionsController = new CreateTransactionsController();
const getTransactionStatusController = new GetTransactionStatusController();

transactionsRoutes.post('/', createTransactionsController.handle);
transactionsRoutes.get('/:id', getTransactionStatusController.handle);
