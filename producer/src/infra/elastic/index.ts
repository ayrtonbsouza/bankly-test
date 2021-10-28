import elasticsearch, { Client } from 'elasticsearch';

export function getClient(): Client {
  const client = new elasticsearch.Client({
    host: 'localhost:9200',
  });

  return client;
}
