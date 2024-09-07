import {ForbiddenException, Injectable} from "@nestjs/common"
import {InjectModel} from "@nestjs/mongoose"
import {Model} from "mongoose"
import { AuthDto } from "src/auth/dto/auth.dto"
import { User, UsersDocument } from "src/schemas/users.schema"
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel : Model<UsersDocument>){}

        async register(dto:AuthDto): Promise <User | null>{
            const user = await  this.userModel.collection.findOne({username:dto.username})
            if(user) return null;
            // const hashedPassword = await this.hashedData(dto.password)
            // const newDto = {username:dto.username, hashedPassword}
            const createUser = new this.userModel(dto)
            return createUser.save()
            

        }
        // async hashedData(data:string){
        //     return bcrypt.hash(data,10)
        // }
        async login(dto:AuthDto): Promise<User | null>{
             const user = await this.findOne(dto.username)
             if(!user) return null;

             return user as User


        }
        async findOne(username:string):Promise <User>{
            return this.userModel.findOne({username})
        }
}
