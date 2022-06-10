import "reflect-metadata"
import { DataSource } from "typeorm"
import { Post } from "./entity/post.model";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "my-secret-pw",
    database: "test",
    synchronize: false,
    logging: false,
    entities: [Post],
    migrations: ["typeorm/migration/**/*.ts"],
    subscribers: ["typeorm/subscriber/**/*.ts"]
})

let dataSource: DataSource;

export const InitDb = async () => {
    if (!dataSource) {
        console.log('init db mysql')
        dataSource = await AppDataSource.initialize();
    }

    return dataSource;
}
