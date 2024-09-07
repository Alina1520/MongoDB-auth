import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import { CostService } from "./cost.service";
import { Cost, CostSchema } from "src/schemas/costs.schema";
import { CostController } from "./cost.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports:[
        MongooseModule.forFeature([{name:Cost.name,schema:CostSchema}]),
        AuthModule
    ],
    providers:[CostService],
    controllers:[CostController]
})
export class CostModule{}