import { Kafka, logLevel, Producer } from 'kafkajs';

export function getProducer(): Producer {
  const kafka = new Kafka({
    clientId: 'transactions',
    brokers: ['kafka:9092'],
    logLevel: logLevel.WARN,
    retry: {
      initialRetryTime: 300,
      retries: 10,
    },
  });

  const producer = kafka.producer();

  return producer;
}
