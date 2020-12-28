import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCustomers1609119693119
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'customers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
