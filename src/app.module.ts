import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ExpencesModule } from './expences/expences.module';

@Module({
  imports: [UserModule, ExpencesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
