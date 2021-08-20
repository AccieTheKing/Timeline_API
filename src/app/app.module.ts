import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/users/user.module';
import { BoardModule } from 'src/boards/board.module';
import { MilestoneModule } from 'src/milestones/milestone.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Accie:Welkom01@cluster0.rnsp1.gcp.mongodb.net/test?retryWrites=true&w=majority',
      { useFindAndModify: false },
    ),
    UserModule,
    BoardModule,
    MilestoneModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
