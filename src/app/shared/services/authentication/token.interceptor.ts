import {tap} from 'rxjs/operators';

import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorage} from './token.storage';
import {AuthService} from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  constructor(public token: TokenStorage,
              private authService:AuthService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (this.token.getToken() != null){
      request = request.clone({
        setHeaders: { Authorization: `${this.token.getToken()}`}
      });
    }else{
      request = request.clone();
    }

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    },(error: any) => {
      if (error instanceof HttpErrorResponse && error.status == 401) {
        //this.authService.logout();
        console.log(error);
      }
    }));

  }





}
