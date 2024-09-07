import { Controller, Get, Req,Patch, Res,Param, UseGuards,HttpCode,Delete,HttpStatus,Body,Post } from "@nestjs/common";
import { CostService } from "./cost.service";
import { Response } from "express";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { AuthService } from "src/auth/auth.service";
import { CreateDto } from "./dto/create.dto";
import { UpdateDto } from "./dto/update.dto";

@Controller('cost')
export class CostController{
    constructor(
     private costService:CostService,
     private authService:AuthService){}


   @UseGuards(JwtGuard)
   @HttpCode(HttpStatus.OK)
   @Get()
   async getAllCosts(@Req() req, @Res() res){
        const token = req.token;
        const user = await this.authService.getUserByToken(token)
        const costs = await this.costService.findAll()
        const costFilter = costs.filter(cost=>user._id.toString()===cost.userId)
        return res.send(costFilter)
   }

   @HttpCode(HttpStatus.OK)
   @Patch(":id")
   async updateCost(@Body() updateDto:UpdateDto, @Param("id") id:string){
       return await this.costService.update(updateDto,id)
   }

   @HttpCode(HttpStatus.OK)
   @Delete(":id")
   async deleteCost(@Param("id") id:string){
       return await this.costService.delete(id)
   }

   
   @UseGuards(JwtGuard)
   @HttpCode(HttpStatus.OK)
   @Post()
   async createCost(@Body() createDto:CreateDto, @Req() req){
        const user = await this.authService.getUserByToken(req.token)

        return await this.costService.create({
          ...createDto,
          userId:user._id as string
     })
   }
    
}