import { Injectable } from "@nestjs/common";
import { MongooseOptionsFactory } from "@nestjs/mongoose";
import { MongooseModuleOptions } from "@nestjs/mongoose/dist/interfaces";

@Injectable()
export class MongooseCongigService implements MongooseOptionsFactory{
createMongooseOptions(): MongooseModuleOptions {
    return {
       uri : process.env.MONGO_URL,
       dbName: process.env.DATABASE_NAME
    }
}
}