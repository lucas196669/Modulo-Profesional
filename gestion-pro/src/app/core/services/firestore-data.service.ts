import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {
  getRecordsRealtime(): Observable<any[]> {
    const mock = [
      { id: 101, title: 'Evento Firebase', category: 'ventas', amount: 950, date: '2026-10-12' }
    ];
    return of(mock).pipe(delay(500));
  }
}
