import {MigrationInterface, QueryRunner} from "typeorm";

export class Create1564323074275 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "property" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "state" character varying NOT NULL, "type" character varying NOT NULL, "imageurl" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isadmin" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_d90007b39cfcf412e15823bebc1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_d90007b39cfcf412e15823bebc1"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isadmin" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "property"`);
    }

}
