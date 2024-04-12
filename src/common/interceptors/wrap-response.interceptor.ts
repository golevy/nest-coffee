import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    // return next.handle().pipe(tap((data) => console.log('After...', data))); // tap is used to perform a side effect on the data
    return next.handle().pipe(map((data) => ({ data }))); // map is used to transform the data
  }
}
