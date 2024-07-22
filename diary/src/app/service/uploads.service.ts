import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {
  private baseUrl = 'http://localhost:3001';
  private apiUrl = 'http://localhost:3002'

  constructor(private http: HttpClient) { }

  uploadImage(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/upload`, data);
  }
  getdmessage(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/images`);
  }
  deleteImage(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
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
    return this.http.post<any>(`${this.baseUrl}/uploadpmsg`, data);
  }
  getpmsg(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pmsget`);
  }
  deletepmsg(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deletepmsg/${id}`);
  }
  uploadPDF(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/uploadpdf`, formData);
  }

  fetchPDF(pdfId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/fetch-pdf/${pdfId}`, { responseType: 'blob' });
  }
}
