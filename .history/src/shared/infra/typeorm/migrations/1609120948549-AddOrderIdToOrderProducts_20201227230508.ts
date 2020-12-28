import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export default class AddOrderIdToOrderProducts1609120948549
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn({
      'orders_products', new TableColumn({
        name: 'order_id',
        type: 'uuid',
        isNullable: true;
      })
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
