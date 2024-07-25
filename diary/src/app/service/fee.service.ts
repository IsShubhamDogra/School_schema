import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeeService {
  private apiUrl = 'http://localhost:8000'

  constructor(private http:HttpClient) { }
  uploadfee(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/fee`, data);
  }
}
