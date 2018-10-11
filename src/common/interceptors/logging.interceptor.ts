import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    cell$: Observable<any>,
  ): Observable<any> {
    const now = Date.now();
    console.log('before...');
    return cell$.pipe(
      tap(() => {
        console.log(`after... ${Date.now() - now}ms`);
      }),
    );
  }
}
