import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserService } from 'src/users/user.service';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
    constructor(private userService:UserService){}
  async canActivate(
    context: ExecutionContext,
    // @ts-ignore
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const {username,refresh_token} = request.body
    
    if(!refresh_token){
        throw new UnauthorizedException("Refresh token must not be null")
    }
    if(!username){
        throw new UnauthorizedException("Username must not be null")
    }
    const user = await this.userService.findOne(username)
    if(!user){
        throw new UnauthorizedException("User does not exist")
    }

    return true
  }
}