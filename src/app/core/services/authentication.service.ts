import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandlerService } from 'src/app/shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url: string = `${environment.apiUrl}/oauth/token`;

  constructor(
    private http: HttpClient,
    private eh: HttpErrorHandlerService
  ) { }

  getClientSession(): Observable<object> {
    return this.http.post<object>(this.url, { grantTpe: 'client_credentials'}).pipe(catchError(this.eh.handleError));
  }

  login(email: string, password: string): Observable<object> {
    return this.http.post<object>(this.url, { username: email, password: password, grantType: 'password'}).pipe(catchError(this.eh.handleError));
  }
}
