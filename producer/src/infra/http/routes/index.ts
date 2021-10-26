import { Router } from 'express';

import { transactionsRoutes } from './transactions.routes';

export const router = Router();

router.use('/fund-transfer', transactionsRoutes);
