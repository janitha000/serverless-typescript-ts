import { Context } from "aws-lambda";
import { apiResponse } from "src/common/api-response";
import { InitDb, AppDataSource } from '../../../typeorm/data-source'
import { Post } from '../../../typeorm/entity/post.model'

const hello = async (event, context: Context) => {

    await InitDb();
    // console.log(AppDataSource.manager)
    const users = await AppDataSource.manager.find(Post);

    console.log(users)

    return apiResponse._200({ users })

};

export const main = hello;