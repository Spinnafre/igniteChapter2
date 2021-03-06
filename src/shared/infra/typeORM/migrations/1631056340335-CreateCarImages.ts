import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCarImages1631056340335 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"cars_image",
            columns:[
                {
                    name:"id",
                    type:"uuid",
                    isPrimary:true
                },
                {
                    name:"image_name",
                    type:"varchar"
                },
                {
                    name:"car_id",
                    type:"uuid"
                },
                {
                    name:"created_at",
                    type:"timestamp",
                    default:"now()"
                }
            ]
        }))

        await queryRunner.createForeignKey('cars_image',new TableForeignKey({
            name:"FKCarsImage",
            referencedTableName:"cars",
            referencedColumnNames:["id"],
            columnNames:["car_id"],
            onDelete:"SET NULL",
            onUpdate:"SET NULL"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('cars_image','FKCarsImage')
        await queryRunner.dropTable('cars_image')
    }

}
