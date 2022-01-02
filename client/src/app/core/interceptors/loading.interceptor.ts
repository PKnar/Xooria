import { HandlingLoadingService } from '../services/handling-loading.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private handlingLoading: HandlingLoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.handlingLoading.showLoader();
    return next.handle(req).pipe(
      delay(300),
      finalize(() => {
        this.handlingLoading.hideLoader();
      })
    );
  }
}
