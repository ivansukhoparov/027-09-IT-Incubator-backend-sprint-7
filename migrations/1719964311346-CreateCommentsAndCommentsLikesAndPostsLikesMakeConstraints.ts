import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCommentsAndCommentsLikesAndPostsLikesMakeConstraints1719964311346 implements MigrationInterface {
    name = 'CreateCommentsAndCommentsLikesAndPostsLikesMakeConstraints1719964311346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "CommentLikes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "postId" character varying NOT NULL, "ownerId" uuid NOT NULL, "commentId" uuid, CONSTRAINT "PK_8205dae8dca7f8de8bace52dff2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "addedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "content" character varying NOT NULL, "postId" uuid NOT NULL, "ownerId" uuid NOT NULL, CONSTRAINT "PK_91e576c94d7d4f888c471fb43de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "PostLikes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "addedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "status" character varying NOT NULL, "postId" uuid NOT NULL, "ownerId" uuid NOT NULL, CONSTRAINT "PK_f28e59e14e5f90fbd763c541751" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "createdAt" SET DEFAULT '2024-07-02T23:51:53.648Z'`);
        await queryRunner.query(`ALTER TABLE "CommentLikes" ADD CONSTRAINT "FK_d9e6da41ef57e1b3ce506fb344f" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CommentLikes" ADD CONSTRAINT "FK_8aa5c17107f88789c5bd4028f9d" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comments" ADD CONSTRAINT "FK_68844d71da70caf0f0f4b0ed72d" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comments" ADD CONSTRAINT "FK_3d833b7063e8046120f1cb9a7a3" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PostLikes" ADD CONSTRAINT "FK_acad3c28cf8d94318cf07d2c891" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PostLikes" ADD CONSTRAINT "FK_9686628522341ffa1d6e6aeda4f" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PostLikes" DROP CONSTRAINT "FK_9686628522341ffa1d6e6aeda4f"`);
        await queryRunner.query(`ALTER TABLE "PostLikes" DROP CONSTRAINT "FK_acad3c28cf8d94318cf07d2c891"`);
        await queryRunner.query(`ALTER TABLE "Comments" DROP CONSTRAINT "FK_3d833b7063e8046120f1cb9a7a3"`);
        await queryRunner.query(`ALTER TABLE "Comments" DROP CONSTRAINT "FK_68844d71da70caf0f0f4b0ed72d"`);
        await queryRunner.query(`ALTER TABLE "CommentLikes" DROP CONSTRAINT "FK_8aa5c17107f88789c5bd4028f9d"`);
        await queryRunner.query(`ALTER TABLE "CommentLikes" DROP CONSTRAINT "FK_d9e6da41ef57e1b3ce506fb344f"`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "createdAt" SET DEFAULT '2024-07-02T23:27:53.841Z'`);
        await queryRunner.query(`DROP TABLE "PostLikes"`);
        await queryRunner.query(`DROP TABLE "Comments"`);
        await queryRunner.query(`DROP TABLE "CommentLikes"`);
    }

}
