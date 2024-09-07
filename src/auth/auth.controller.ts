import { Controller,Post,Body,Res,HttpStatus, UseGuards } from "@nestjs/common";
import {Response} from "express"
import { AuthDto } from "./dto/auth.dto";
import { UserService } from "src/users/user.service";
import { AuthGuard } from "./guards/register.guards";
import { LoginGuard } from "./guards/login.guards";
import { AuthService } from "./auth.service";
import { RefreshJwtGuard } from "./guards/refreshJwt.guard";
import { RefreshDto } from "./dto/refresh-token.dto";

@Controller("auth")
export class AuthController {
    constructor(private userService:UserService, private authService:AuthService){}

@UseGuards(AuthGuard)
@Post('/register')
async reisterUser(@Body() dto:AuthDto,@Res() res:Response){

 await this.userService.register(dto)

//  inf for front
 res.statusCode  = HttpStatus.CREATED;
 return res.send("user is created")
}

@UseGuards(LoginGuard)
@Post('/login')
async loginUser(@Body() dto:AuthDto,@Res() res:Response){
  const user =   await this.userService.login(dto)
  
  const access = await this.authService.generateAccessToken(user)
  const refresh = await this.authService.generateRefreshToken(user._id as string)

    
 res.statusCode  = HttpStatus.OK;
 return res.send({username:user.username,...access,...refresh})
} 

@UseGuards(RefreshJwtGuard)
@Post('refresh')
async refreshToken(@Body() refreshDto:RefreshDto,@Res() res:Response){
  const validToken = await this.authService.verifyToken(refreshDto.refresh_token)
  const user = await this.userService.findOne(refreshDto.username)
  const access = await this.authService.generateAccessToken(user)

  if(validToken?.error){
    if(validToken?.error === 'jwt expired'){
      const refresh = await this.authService.generateRefreshToken(user._id.toString())
      res.statusCode = HttpStatus.OK
      return res.send({...access,refresh})
    }else{
      res.statusCode = HttpStatus.BAD_REQUEST
      return res.send({error:validToken?.error})
    }
  }else{
    res.statusCode = HttpStatus.OK
    return res.send({...access,refresh_token:refreshDto.refresh_token})
    }

}


}