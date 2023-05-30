import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserChangePass, UserLogin } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  onLogin(user: UserLogin): Observable<any> {
    return this._http.post<any>('http://localhost:3000/usuarios/signin', user);
  }

  onSignUp(user: UserLogin): Observable<any> {
    return this._http.post<any>('http://localhost:3000/usuarios/signup', user);
  }
  forgotPass(user: UserLogin): Observable<any> {
    return this._http.post<any>('http://localhost:3000/usuarios/forgot', user);
  }

  getUserByEmail(user: UserLogin): Observable<any> {
    return this._http.post<any>('http://localhost:3000/usuarios/', user);
  }

  updateUser(user: any): Observable<any> {
    return this._http.put<any>('http://localhost:3000/usuarios/', user);
  }
  changePass(user: UserChangePass): Observable<any> {
    return this._http.put<any>(
      'http://localhost:3000/usuarios/changepass',
      user
    );
  }
  desactUsuario(user: User): Observable<any> {
    return this._http.put<any>('http://localhost:3000/usuarios/desact', user);
  }

  getUsuarios(): Observable<any> {
    return this._http.get<any>('http://localhost:3000/usuarios');
  }
}
