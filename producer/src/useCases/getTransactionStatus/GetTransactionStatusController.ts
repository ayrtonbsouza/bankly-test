import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetTransactionStatusUseCase } from './GetTransactionStatusUseCase';

export class GetTransactionStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getTransactionStatusUseCase = container.resolve(
      GetTransactionStatusUseCase
    );

    const data = await request.elastic.search({
      index: 'transactions',
      q: `id:${id}`,
    });

    if (data.hits.total === 0) {
      const status = await getTransactionStatusUseCase.execute(id as string);
      return response.status(200).json(status);
    }

    return response.status(200).json({
      status: data.hits.hits[0].fields.status.values[0],
      error: data.hits.hits[0].fields.error.values[0],
    });
  }
}
