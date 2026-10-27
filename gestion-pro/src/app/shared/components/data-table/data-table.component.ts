import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  @Input() data: any[] = [];
  @Input() columns: { key: string; label: string }[] = [];
  @Output() rowSelected = new EventEmitter<any>();
  @Output() rowDeleted = new EventEmitter<any>();
  @Output() searchChanged = new EventEmitter<string>();

  searchTerm = '';
  page = 1;
  pageSize = 5;

  onSearch(): void {
    this.searchChanged.emit(this.searchTerm);
  }

  selectRow(row: any): void {
    this.rowSelected.emit(row);
  }

  deleteRow(row: any): void {
    this.rowDeleted.emit(row);
  }

  get filtered(): any[] {
    let result = this.data;
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(term)));
    }
    return result;
  }

  get paginated(): any[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
  }
}
