import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/schemas/users.schema";
import { UserService } from "src/users/user.service";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthService{
    constructor(private userService:UserService, private jwtService:JwtService){}
    async validateUser(username:string):Promise<User |null>{
       const user = await this.userService.findOne(username)
       if(!user) return null;
       return user;
    }
    async generateAccessToken(user:User){
        return {
           access_token: await this.jwtService.signAsync({user})
        }
    }
    async generateRefreshToken(userId:string){
        return {
           refresh_token: await this.jwtService.signAsync(
            {userId},
            {
                secret:jwtConstants.secret,
                expiresIn: '30d'
            }
            )
        }
    }

    verifyToken(token:string){
        try {
            return this.jwtService.verify(token)
        }catch(error){
            return {error:error.message}
        }
    }
     parseJwt(token:string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
    async getUserByToken(token:string):Promise<User>{
        const parseData = this.parseJwt(token);
        return await this.userService.findOne(parseData.user.username)
    }
}