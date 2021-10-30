import { Transaction } from '@/infra/typeorm/entities/Transaction';

export interface ITransactionsRepository {
  findById(id: string): Promise<Transaction>;
  save(transaction: Transaction): Promise<Transaction>;
}
