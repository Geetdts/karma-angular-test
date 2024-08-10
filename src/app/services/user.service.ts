import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this._http.post('http://localhost:8080/api/v1/user/login', body);
  }
  
}
