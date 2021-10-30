import { getRepository, Repository } from 'typeorm';

import { ITransactionsRepository } from '@/repositories/ITransactionsRepository';

import { Transaction } from '../entities/Transaction';

export class TransactionsRepository implements ITransactionsRepository {
  private repository: Repository<Transaction>;

  constructor() {
    this.repository = getRepository(Transaction);
  }

  async findById(id: string): Promise<Transaction> {
    const transaction = await this.repository.findOne(id);

    return transaction;
  }

  async save(transaction: Transaction): Promise<Transaction> {
    const savedTransaction = await this.repository.save(transaction);
    return savedTransaction;
  }
}
