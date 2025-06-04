import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  constructor(private http: HttpClient) {}

  protected getQuery$<R>(url: string, params?: HttpParams): Observable<R> {
    return this.http.get<R>(url, { params });
  }

  protected postQuery$<T, B>(url: string, data: T): Observable<B> {
    return this.http.post<B>(url, data);
  }

  protected patchQuery$<T, B>(url: string, data: T): Observable<B> {
    return this.http.patch<B>(url, data);
  }

  protected deleteQuery$<T, B>(url: string): Observable<B> {
    return this.http.delete<B>(url);
  }
}
