import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmartcarController } from './smartcar/smartcar.controller';
import { ConfigModule } from './common/config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [AppController, SmartcarController],
  providers: [AppService],
})
export class AppModule {}
