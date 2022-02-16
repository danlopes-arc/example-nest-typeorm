import {MigrationInterface, QueryRunner} from "typeorm";

export class alterUsersTableAddIsColumn1644972330280 implements MigrationInterface {
    name = 'alterUsersTableAddIsColumn1644972330280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is\``);
    }

}
