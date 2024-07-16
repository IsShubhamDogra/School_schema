import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService { 
  private baseUrl = 'http://localhost:3000'; 

  constructor(public http: HttpClient) { }
  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, user);
  }
}
