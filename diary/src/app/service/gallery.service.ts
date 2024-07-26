import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http:HttpClient) { }

  uploadphoto(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/gallery`, data);
}
getImages(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/galleryimg`);
}
deletephoto(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/deleteimg/${id}`);
}
}
