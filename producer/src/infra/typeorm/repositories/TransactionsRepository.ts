import { getRepository, Repository } from 'typeorm';

import { ICreateTransactionDTO } from '@/dtos/ICreateTransactionDTO';
import { Transaction } from '@/infra/typeorm/entities/Transaction';
import { ITransactionsRepository } from '@/repositories/ITransactionsRepository';

interface IResponse {
  status: string;
  error?: string;
}

export class TransactionsRepository implements ITransactionsRepository {
  private repository: Repository<Transaction>;

  constructor() {
    this.repository = getRepository(Transaction);
  }
  async getStatusById(id: string): Promise<IResponse> {
    const { status, error } = await this.repository.findOne(id);
    return {
      status,
      error,
    };
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
