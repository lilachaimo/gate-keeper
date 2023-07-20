import { Module, NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionModule } from './session/session.module';
import { SessionMiddleware } from './session/session.middleware';
import { UserActivityMiddleware } from './activity/user-activity.middleware';

@Module({
  imports: [SessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
