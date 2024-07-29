import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FeeService {
private baseUrl = 'http://localhost:8000/fee'

  constructor(private http:HttpClient) { }

  getFeeDetails(selectedClass: string, selectedStream: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?classes=${encodeURIComponent(selectedClass)}&stream=${encodeURIComponent(selectedStream)}`);
  }
}
