import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.time('Request-response time');
    console.log('Hi from middleware!');

    res.on('finish', () => console.timeEnd('Request-response time'));
    next();
  }
}
