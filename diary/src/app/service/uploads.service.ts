import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  uploadImage(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload`, data);
  }
  getdmessage(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dmsg`);
  }
  deleteImage(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
  uploadCarousel(data:FormData):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/uploadcarousel`,data);
  }
  getImages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/images`);
  }
  deletecarousel(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
  Pmsgupload(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/uploadpmsg`, data);
  }
  getpmsg(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pmsget`);
  }
  deletepmsg(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletepmsg/${id}`);
  }
}
