import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmartcarController } from './smartcar/smartcar.controller';
import { ConfigModule } from './common/config/config.module';
import { SmartcarService } from './smartcar/smartcar.service';
import { DatabaseModule } from './common/database/database.module';
import { DebugModule } from './debug/debug.module';

@Module({
  imports: [ConfigModule, DatabaseModule, DebugModule],
  controllers: [AppController, SmartcarController],
  providers: [AppService, SmartcarService, Logger],
})
export class AppModule {}
