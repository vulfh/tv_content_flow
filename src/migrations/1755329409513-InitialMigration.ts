import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1755329409513 implements MigrationInterface {
    name = 'InitialMigration1755329409513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "platforms" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "uri" character varying(512) NOT NULL, CONSTRAINT "PK_3b879853678f7368d46e52b81c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "content_types" ("id" integer NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_ce94145fcda04af3b3153f44f2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contents" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "content_type_id" integer NOT NULL, "description" text, CONSTRAINT "PK_b7c504072e537532d7080c54fac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contents_on_platforms" ("id" SERIAL NOT NULL, "content_id" integer NOT NULL, "platform_id" integer NOT NULL, "rank" integer NOT NULL, CONSTRAINT "PK_47c721c9aed3459e6fdf8585d61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contents" ADD CONSTRAINT "FK_74aceae9af8fb7bcf5bb62c15bf" FOREIGN KEY ("content_type_id") REFERENCES "content_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contents_on_platforms" ADD CONSTRAINT "FK_657fe6806db83a7862bf514988d" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contents_on_platforms" ADD CONSTRAINT "FK_5a02b316cd2ae041f1dd40493fc" FOREIGN KEY ("platform_id") REFERENCES "platforms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contents_on_platforms" DROP CONSTRAINT "FK_5a02b316cd2ae041f1dd40493fc"`);
        await queryRunner.query(`ALTER TABLE "contents_on_platforms" DROP CONSTRAINT "FK_657fe6806db83a7862bf514988d"`);
        await queryRunner.query(`ALTER TABLE "contents" DROP CONSTRAINT "FK_74aceae9af8fb7bcf5bb62c15bf"`);
        await queryRunner.query(`DROP TABLE "contents_on_platforms"`);
        await queryRunner.query(`DROP TABLE "contents"`);
        await queryRunner.query(`DROP TABLE "content_types"`);
        await queryRunner.query(`DROP TABLE "platforms"`);
    }

}
