import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleUpdate21692483581345 implements MigrationInterface {
    name = 'RoleUpdate21692483581345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP NOT NULL`);
    }

}
