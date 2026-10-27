import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { SupabaseDataService } from '../../../core/services/supabase-data.service';
import { FirestoreDataService } from '../../../core/services/firestore-data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './dashboard.page.html',
})
export class DashboardPage {
  products: any[] = [];
  orders: any[] = [];
  firestore: any[] = [];

  constructor(private supabaseData: SupabaseDataService, private firestoreData: FirestoreDataService) {
    forkJoin({
      products: this.supabaseData.getProducts(),
      orders: this.supabaseData.getOrders(),
      firestore: this.firestoreData.getRecordsRealtime()
    }).subscribe((res: any) => {
      this.products = res.products;
      this.orders = res.orders;
      this.firestore = res.firestore;
    });
  }
}
