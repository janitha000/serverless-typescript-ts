import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddress1654602744914 implements MigrationInterface {
    name = 'AddAddress1654602744914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`address\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`address\``);
    }

}
