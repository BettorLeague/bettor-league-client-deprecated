import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {TokenStorage} from './token.storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient,
              private token: TokenStorage) {
  }

  public attemptAuth(loginRequest): Observable<any> {
    return this.http.post(this.baseUrl+'/api/auth/generate-token',loginRequest);
  }

  public attemptSignUp(signupRequest): Observable<any> {
    return this.http.post(this.baseUrl+'/api/auth/signup',signupRequest);
  }

  public logout(){
    this.token.removeToken();
  }

  isLoggedIn(): boolean {
    const token: String = this.token.getToken();
    return token && token.length > 0;
  }






}
