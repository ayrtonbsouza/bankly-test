import { ICreateTransactionDTO } from '@/dtos/ICreateTransactionDTO';
import { Transaction } from '@/infra/typeorm/entities/Transaction';

interface IStatus {
  status: string;
  message?: string;
}

export interface ITransactionsRepository {
  create({
    accountOrigin,
    accountDestination,
    value,
  }: ICreateTransactionDTO): Promise<Transaction>;
  getStatusById(id: string): Promise<IStatus>;
}
