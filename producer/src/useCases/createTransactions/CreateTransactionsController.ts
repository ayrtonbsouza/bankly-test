import { Transaction } from "@/infra/typeorm/entities/Transaction";
import { Request, Response } from "express";
import { CompressionTypes } from "kafkajs";
import { container } from "tsyringe";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

export class CreateTransactionsController {
  private async sendToKafka(request: Request, transaction: Transaction): Promise<void> {
    await request.producer.connect();
    try {
      await request.producer.send({
        topic: 'transactions',
        compression: CompressionTypes.GZIP,
        messages: [
          {
            value: JSON.stringify(transaction),
          }
        ]
      })
    } catch (error) {
      console.log(error)
    }
  }

  private async sendToElastic(request: Request, transaction: Transaction): Promise<void> {
    try {
      await request.elastic.index({
        index: 'transactions',
        type: 'transactions',
        body: transaction
      })
    } catch (error) {
      console.log(error)
    }
  }

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


    Promise.all([
      await this.sendToKafka(request, transaction),
      await this.sendToElastic(request, transaction)
    ]).catch(error => {
      return response.status(500).json({
        error: 'Error sending data',
        message: error.message
      })
    })

    return response.status(200).json({
      transactionId: transaction.id,
    })
  }
}
