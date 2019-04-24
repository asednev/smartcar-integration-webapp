import { Module } from '@nestjs/common';
import { DebugController } from './debug.controller';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports: [ DatabaseModule],
  controllers: [DebugController],
})
export class DebugModule {}
