import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  private apiUrl='http://localhost:8000'

  constructor(private http:HttpClient) { }

  subscribedone(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/subscribe`, data);
  }

  QueryUpload(data:FormData):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/query`,data)
  }

}
