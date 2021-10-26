import { Router } from 'express';

import { CreateTransactionsController } from '@/useCases/createTransactions/CreateTransactionsController'

export const transactionsRoutes = Router()

const createTransactionsController = new CreateTransactionsController();

transactionsRoutes.post('/', createTransactionsController.handle);
