import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1692475773444 implements MigrationInterface {
  name = 'Init1692475773444';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "image" character varying NOT NULL, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "brand" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "image" character varying NOT NULL, CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name"), CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("date" date NOT NULL, CONSTRAINT "PK_c0f10e11d9e196bb29125a6943c" PRIMARY KEY ("date"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "customer"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "brand"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
