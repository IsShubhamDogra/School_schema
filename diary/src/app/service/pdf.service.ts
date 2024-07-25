import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  uploadPdf(file: File, text: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('pdf', file, file.name);
    formData.append('text', text);
    return this.http.post(`${this.apiUrl}/pdfupload`, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }

  getPdfUrl(id: number): string {
    return `${this.apiUrl}/pdf/${id}`;
  }

  getAllPdfs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pdf`);
  }
  deletepdf(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletepdf/${id}`);
  }
}
