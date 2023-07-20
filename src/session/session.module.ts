import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionMiddleware } from './session.middleware';
import { SessionController } from './session.controller';

@Module({
  controllers:[SessionController],
  providers: [SessionService],
})
export class SessionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
