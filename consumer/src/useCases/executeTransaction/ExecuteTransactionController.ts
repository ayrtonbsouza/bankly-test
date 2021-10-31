import { KafkaMessage } from 'kafkajs';
import { container } from 'tsyringe';

import api from '@/infra/api';
import { getClient } from '@/infra/elastic';

import { ExecuteTransactionUseCase } from './ExecuteTransactionUseCase';

export class ExecuteTransactionController {
  private async getBalance(accountId: string): Promise<number | string> {
    await api
      .get(`/api/Account/${accountId}`)
      .then(async (response) => {
        const { balance } = response.data;
        return balance as number;
      })
      .catch((error) => {
        console.log(error);
      });
    return null;
  }
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

    const balanceOrigin = await this.getBalance(accountOrigin);
    const balanceDestination = await this.getBalance(accountDestination);

    if (balanceOrigin > value && balanceDestination != null) {
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
    } else if (balanceOrigin === null || balanceDestination === null) {
      const transaction = await executeTransactionUseCase.execute({
        id,
        accountOrigin,
        accountDestination,
        status: 'Error',
        error: 'Account not found',
        value,
        createdAt,
      });

      await client.update({
        index: 'transactions',
        type: 'transactions',
        id: transaction.id,
        body: transaction,
      });
    } else if (balanceOrigin < value) {
      const transaction = await executeTransactionUseCase.execute({
        id,
        accountOrigin,
        accountDestination,
        status: 'Error',
        error: 'Insufficient funds',
        value,
        createdAt,
      });

      await client.update({
        index: 'transactions',
        type: 'transactions',
        id: transaction.id,
        body: transaction,
      });
    } else {
      const transaction = await executeTransactionUseCase.execute({
        id,
        accountOrigin,
        accountDestination,
        status: 'Error',
        error: 'Unknown error',
        value,
        createdAt,
      });

      await client.update({
        index: 'transactions',
        type: 'transactions',
        id: transaction.id,
        body: transaction,
      });

      // TODO: Send transaction back to topic with ack to retry later
    }
  }
}
