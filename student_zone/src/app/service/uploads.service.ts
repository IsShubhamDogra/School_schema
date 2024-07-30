import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {
  private apiUrl = 'http://localhost:8000';

  constructor(public http: HttpClient) { }
  getdmessage(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dmsg`);
  }
  getImages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/images`);
  }
  pmsg(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pmsget`);
  }
  getGalleryImages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/galleryimg`);
  }

  getSchoolMessage(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/s_msg`);
  }
}
