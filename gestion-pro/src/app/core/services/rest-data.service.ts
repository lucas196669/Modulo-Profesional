import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Record } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RestDataService {
  constructor(private http: HttpClient) {}

  getRecords(): Observable<Record[]> {
    return this.http.get<Record[]>(${environment.apiUrl}/records);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(${environment.apiUrl}/users);
  }
}
