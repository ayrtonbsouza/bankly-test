import { inject, injectable } from 'tsyringe';

import { ITransactionsRepository } from '@/repositories/ITransactionsRepository';

interface IStatus {
  status: string;
  message?: string;
}

@injectable()
export class GetTransactionStatusUseCase {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository
  ) {}

  public async execute(transactionId: string): Promise<IStatus> {
    const status = await this.transactionsRepository.getStatusById(
      transactionId
    );
    return status;
  }
}
