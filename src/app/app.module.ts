import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/users/user.module';
import { BoardModule } from 'src/boards/board.module';
import { MilestoneModule } from 'src/milestones/milestone.module';
import { AuthModule } from 'src/auth/auth.module';
import { configurations } from 'src/config/configurations';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB, { useFindAndModify: false }),
    UserModule,
    BoardModule,
    MilestoneModule,
    AuthModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
