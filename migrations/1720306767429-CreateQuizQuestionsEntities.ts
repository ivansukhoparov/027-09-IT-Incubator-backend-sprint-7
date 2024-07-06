import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuizQuestionsEntities1720306767429 implements MigrationInterface {
    name = 'CreateQuizQuestionsEntities1720306767429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "QuizQuestions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "body" character varying NOT NULL, "correctAnswers" json NOT NULL, "published" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_da996a025cd02877083c47ea971" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "createdAt" SET DEFAULT '2024-07-06T22:59:29.959Z'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "createdAt" SET DEFAULT '2024-07-06T22:57:47.874Z'`);
        await queryRunner.query(`DROP TABLE "QuizQuestions"`);
    }

}
