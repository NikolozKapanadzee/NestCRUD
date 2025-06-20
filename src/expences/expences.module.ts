import { Module } from '@nestjs/common';
import { ExpencesController } from './expences.controller';
import { ExpencesService } from './expences.service';

@Module({
  controllers: [ExpencesController],
  providers: [ExpencesService],
})
export class ExpencesModule {}
