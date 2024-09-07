import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {MongooseModule} from "@nestjs/mongoose";
import { MongooseCongigService } from './config/MongooseConfig';
import configurations from './config/configurations';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { CostModule } from './costs/cost.module';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports:[ ConfigModule],
      useClass: MongooseCongigService
    }),
    ConfigModule.forRoot({
      load:[configurations]
    }),
    UserModule,
    AuthModule,
    CostModule
  ],
 
})
export class AppModule {}
