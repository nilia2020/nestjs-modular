import { MigrationInterface, QueryRunner } from 'typeorm';

export class PhoneUpdate1692483396072 implements MigrationInterface {
  name = 'PhoneUpdate1692483396072';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "phone" character varying(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "phone" character varying`,
    );
  }
}
