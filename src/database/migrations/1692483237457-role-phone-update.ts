import { MigrationInterface, QueryRunner } from 'typeorm';

export class RolePhoneUpdate1692483237457 implements MigrationInterface {
  name = 'RolePhoneUpdate1692483237457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" character varying(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying`);
  }
}
