import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http:HttpClient) { }

  getPdfUrl(id: number): string {
    return `${this.apiUrl}/pdf/${id}`;
  }

  getAllPdfs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pdf`);
  }

}
