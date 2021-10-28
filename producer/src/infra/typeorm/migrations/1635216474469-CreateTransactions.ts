import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTransactions1635216474469 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'accountOrigin',
            type: 'varchar',
          },
          {
            name: 'accountDestination',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'numeric',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'error',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
