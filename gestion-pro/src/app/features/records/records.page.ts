import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RestDataService } from '../../../core/services/rest-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './records.page.html',
  styleUrls: ['./records.page.scss'],
})
export class RecordsPage implements OnDestroy {
  private destroy$ = new Subject<void>();
  records: any[] = [];

  constructor(private rest: RestDataService) {
    this.rest.getRecords().pipe(takeUntil(this.destroy$)).subscribe(r => this.records = r);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
