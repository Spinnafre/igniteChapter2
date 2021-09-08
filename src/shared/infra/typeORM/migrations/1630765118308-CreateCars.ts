import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCars1630765118308 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"cars",
            columns:[
                {
                    name:"id",
                    type:"uuid",
                    isPrimary:true,
                },
                {
                    name:"name",
                    type:"varchar",
                },
                {
                    name:"description",
                    type:"varchar",
                },
                {
                    name:"daily_rate",
                    type:"numeric",
                },
                {
                    name:"available",
                    type:"boolean",
                },
                {
                    name:"license_plate",
                    type:"varchar",
                },
                {
                    name:"fine_amount",
                    type:"numeric",
                },
                {
                    name:"brand",
                    type:"varchar",
                },
                {
                    name:"category_id",
                    type:"uuid",
                    isNullable:true
                },
                {
                    name:"created_at",
                    type:"timestamp",
                    default:"now()"
                },
            ]
        }))

        await queryRunner.createForeignKey('cars',new TableForeignKey(
            {
                name:"FKCategoryCar",
                columnNames:["category_id"],
                referencedTableName:"categories",
                referencedColumnNames:["id"],
                onDelete:"SET NULL",
                onUpdate:"SET NULL",
    
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cars')
    }

}
