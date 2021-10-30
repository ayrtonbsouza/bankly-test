import { KafkaMessage } from 'kafkajs';
import { container } from 'tsyringe';

import { getClient } from '@/infra/elastic';

import { ExecuteTransactionUseCase } from './ExecuteTransactionUseCase';

export class ExecuteTransactionController {
  async handle(message: KafkaMessage): Promise<void> {
    const {
      id,
      accountOrigin,
      accountDestination,
      status,
      error,
      value,
      createdAt,
    } = JSON.parse(message.value.toString());

    const executeTransactionUseCase = container.resolve(
      ExecuteTransactionUseCase
    );

    const client = getClient();

    const transaction = await executeTransactionUseCase.execute({
      id,
      accountOrigin,
      accountDestination,
      status,
      error,
      value,
      createdAt,
    });

    await client.update({
      index: 'transactions',
      type: 'transactions',
      id: transaction.id,
      body: transaction,
    });
  }
}
