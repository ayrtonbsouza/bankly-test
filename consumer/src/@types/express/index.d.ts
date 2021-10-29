/* eslint-disable @typescript-eslint/naming-convention */
import { Client } from 'elasticsearch';

declare global {
  namespace Express {
    export interface Request {
      elastic?: Client;
    }
  }
}
