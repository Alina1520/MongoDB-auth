import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cost, CostDocument } from "src/schemas/costs.schema";
import { Model } from "mongoose"
import { CreateDto } from "./dto/create.dto";
import { UpdateDto } from "./dto/update.dto";

@Injectable()
export class CostService{
   constructor(@InjectModel(Cost.name) private costModel: Model <CostDocument>){} 

   async findAll():Promise <Cost[]>{
      return this.costModel.find()
   }
   async findOne(id:string){
   return this.costModel.find({_id:id});
   }

   async create(createDto:CreateDto):Promise<Cost>{
    const createCost = new this.costModel(createDto)
    return createCost.save()
   }

   async update(updateDto : UpdateDto, id:string){
    await this.costModel.updateOne(
        {
            _id:id
        },
        {
            $set:{
        ...updateDto
    }})
    return this.findOne(id)
   }

   async delete(id:string){
      await this.costModel.deleteOne({_id:id})
   }

}