import { KafkaMessage } from 'kafkajs';
import { container } from 'tsyringe';

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

    const transaction = await executeTransactionUseCase.execute({
      id,
      accountOrigin,
      accountDestination,
      status,
      error,
      value,
      createdAt,
    });
  }
}
