import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  public get(url: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${url}`);
  }
  public post(url: string, body: any): Observable<any> {
    return this.http.post(`${this.API_URL}/${url}`, body);
  }
  public patch(url: string, body: any): Observable<any> {
    return this.http.patch(`${this.API_URL}/${url}`, body);
  }
  public delete(url: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${url}`);
  }

}
