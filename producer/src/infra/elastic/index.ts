import elasticsearch, { Client } from 'elasticsearch';

export function getClient(): Client {
  const client = new elasticsearch.Client({
    host: 'elasticsearch:9200',
  });
  return client;
}
