import { ICreateTransactionDTO } from "@/dtos/ICreateTransactionDTO";
import { Transaction } from "@/infra/typeorm/entities/Transaction";
import { ITransactionsRepository } from "@/repositories/ITransactionsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateTransactionUseCase {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository
  ) {}

  async execute({
    accountDestination,
    accountOrigin,
    value
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = await this.transactionsRepository.create({
      accountDestination,
      accountOrigin,
      value
    })

    return transaction
  }
}
