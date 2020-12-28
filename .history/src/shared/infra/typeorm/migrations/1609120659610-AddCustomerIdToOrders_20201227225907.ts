import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class AddCustomerIdToOrders1609120659610
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'customer_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
