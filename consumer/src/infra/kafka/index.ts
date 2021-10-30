import { Consumer, Kafka, logLevel } from 'kafkajs';

import { ExecuteTransactionController } from '@/useCases/executeTransaction/ExecuteTransactionController';

function getConsumer(): Consumer {
  const kafka = new Kafka({
    clientId: 'transactions',
    brokers: ['kafka:9092'],
    logLevel: logLevel.WARN,
    retry: {
      initialRetryTime: 300,
      retries: 10,
    },
  });

  const consumer = kafka.consumer({ groupId: 'transactions' });

  return consumer;
}

export async function runConsumer(): Promise<void> {
  const consumer = getConsumer();

  await consumer.connect();

  await consumer.subscribe({ topic: 'transactions', fromBeginning: true });

  const executeTransactionController = new ExecuteTransactionController();

  await consumer.run({
    eachMessage: async ({ message }) => {
      executeTransactionController.handle(message);
    },
  });
}
