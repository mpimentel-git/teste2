import { environment } from './../../environments/environment';
import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add auth header with jwt if user is logged in and request is to the api url
      const currentUser = this.authenticationService.currentUserValue;
      const isLoggedIn = currentUser && localStorage.getItem('jwt-token');
      const isApiUrl = request.url.startsWith(environment.baseUrl);
      // console.log(isApiUrl);

      if (isLoggedIn && isApiUrl) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${localStorage.getItem('jwt-token')}`
              }
          });
      }

      return next.handle(request);
  }
}
