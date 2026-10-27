import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupabaseDataService {
  constructor(private supabase: SupabaseService) {}

  getProducts(): Observable<any[]> {
    return from(this.supabase.client.from('products').select('*')).pipe(map((res: any) => res.data || []));
  }

  getOrders(): Observable<any[]> {
    return from(this.supabase.client.from('orders').select('*')).pipe(map((res: any) => res.data || []));
  }
}
