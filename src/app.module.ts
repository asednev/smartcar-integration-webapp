import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmartcarController } from './smartcar/smartcar.controller';
import { ConfigModule } from './common/config/config.module';
import { SmartcarService } from './smartcar/smartcar.service';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [AppController, SmartcarController],
  providers: [AppService, SmartcarService],
})
export class AppModule {}
