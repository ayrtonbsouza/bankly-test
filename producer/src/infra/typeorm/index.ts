import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (database = 'bankly'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      database,
    })
  );
};
