import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {
  private baseUrl = 'http://localhost:3001'; 
  private apiUrl = 'http://localhost:3002';

  constructor(public http: HttpClient) { }
  getdmessage(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/images`);
  }
  getImages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/images`);
  }
}
