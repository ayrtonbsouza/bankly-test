import { inject, injectable } from 'tsyringe';

import { Transaction } from '@/infra/typeorm/entities/Transaction';
import { ITransactionsRepository } from '@/repositories/ITransactionsRepository';

@injectable()
export class ExecuteTransactionUseCase {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository
  ) {}

  async execute(transaction: Transaction): Promise<Transaction> {
    const transactionExists = await this.transactionsRepository.findById(
      transaction.id
    );

    if (!transactionExists) {
      throw new Error('Transaction not found');
    }

    return this.transactionsRepository.save(transaction);
  }
}
