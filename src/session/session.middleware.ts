import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SessionService } from './session.service';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly sessionService: SessionService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.sessionService.getSessionMiddleware()(req, res, next);
  }
}
