/* eslint-disable @typescript-eslint/naming-convention */
import { Client } from 'elasticsearch';
import { Producer } from 'kafkajs';

declare global {
  namespace Express {
    export interface Request {
      producer?: Producer;
      elastic?: Client;
    }
  }
}
