import { Request, Response } from "express";
import { CompressionTypes } from "kafkajs";
import { container } from "tsyringe";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

export class CreateTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { accountOrigin, accountDestination, value } = request.body;

    const createTransactionUseCase = container.resolve(
      CreateTransactionUseCase
    );

    const transaction = await createTransactionUseCase.execute({
      accountOrigin,
      accountDestination,
      value,
    })

    await request.producer.send({
      topic: 'transactions',
      compression: CompressionTypes.GZIP,
      messages: [
        {
          value: JSON.stringify(transaction),
        }
      ]
    })

    return response.status(200).json({
      transactionId: transaction.id,
    })
  }
}
