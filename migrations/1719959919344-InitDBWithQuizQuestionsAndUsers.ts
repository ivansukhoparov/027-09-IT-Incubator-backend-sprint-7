import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDBWithQuizQuestionsAndUsers1719959919344 implements MigrationInterface {
  name = 'InitDBWithQuizQuestionsAndUsers1719959919344';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "email" character varying NOT NULL, "hash" character varying NOT NULL, "createdAt" character varying NOT NULL DEFAULT '2024-07-02T22:38:41.451Z', "isConfirmed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "UserTokensMetaData" ("userId" uuid NOT NULL, "confirmationCodeMetaExp" character varying NOT NULL, "recoveryTokenMetaExp" character varying NOT NULL, CONSTRAINT "PK_bf5c0455307f320c1a043d0394b" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "QuizQuestions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "body" character varying NOT NULL, "correctAnswers" json NOT NULL, "published" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_da996a025cd02877083c47ea971" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserTokensMetaData" ADD CONSTRAINT "FK_bf5c0455307f320c1a043d0394b" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "UserTokensMetaData" DROP CONSTRAINT "FK_bf5c0455307f320c1a043d0394b"`);
    await queryRunner.query(`DROP TABLE "QuizQuestions"`);
    await queryRunner.query(`DROP TABLE "UserTokensMetaData"`);
    await queryRunner.query(`DROP TABLE "Users"`);
  }
}
