import "reflect-metadata";
import { createConnection } from "typeorm";


/*createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    entities: [
        Photo
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    // here you can start to work with your entities
}).catch(error => console.log(error));*/
createConnection().then(connection => {
    // here you can start to work with your entities
}).catch(error => console.log(error));