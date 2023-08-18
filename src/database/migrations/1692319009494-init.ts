import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1692319009494 implements MigrationInterface {
    name = 'Init1692319009494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("date" date NOT NULL, CONSTRAINT "PK_c0f10e11d9e196bb29125a6943c" PRIMARY KEY ("date"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
