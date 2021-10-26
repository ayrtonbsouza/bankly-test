import { ICreateTransactionDTO } from '@/dtos/ICreateTransactionDTO';
import { Transaction } from '@/infra/typeorm/entities/Transaction';

export interface ITransactionsRepository {
  create({
    accountOrigin,
    accountDestination,
    value,
  }: ICreateTransactionDTO): Promise<Transaction>;
}
