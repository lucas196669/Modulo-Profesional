import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {
  getRecordsRealtime(): Observable<any[]> {
    const mock = [
      { id: 201, title: 'Evento Firestore', category: 'ventas', amount: 450, date: '2026-10-18' }
    ];
    return of(mock).pipe(delay(300));
  }
}
