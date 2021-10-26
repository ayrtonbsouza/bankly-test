import { getRepository, Repository } from 'typeorm';

import { ICreateTransactionDTO } from '@/dtos/ICreateTransactionDTO';
import { Transaction } from '@/infra/typeorm/entities/Transaction';
import { ITransactionsRepository } from '@/repositories/ITransactionsRepository';

export class TransactionsRepository implements ITransactionsRepository {
  private repository: Repository<Transaction>;

  constructor() {
    this.repository = getRepository(Transaction);
  }

  async create({
    accountDestination,
    accountOrigin,
    value,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.repository.create({
      accountDestination,
      accountOrigin,
      value,
    });

    await this.repository.save(transaction);

    return transaction;
  }
}
