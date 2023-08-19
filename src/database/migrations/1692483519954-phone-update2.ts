import { MigrationInterface, QueryRunner } from "typeorm";

export class PhoneUpdate21692483519954 implements MigrationInterface {
    name = 'PhoneUpdate21692483519954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "phone" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "phone" DROP NOT NULL`);
    }

}
