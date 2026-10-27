import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RestDataService } from '../../../core/services/rest-data.service';
import { FirestoreDataService } from '../../../core/services/firestore-data.service';
import { forkJoin, combineLatest } from 'rxjs';
import { StatWidgetComponent } from '../../../shared/components/stat-widget/stat-widget.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IonicModule, StatWidgetComponent, BaseChartDirective],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  loading = true;
  total = 0;
  records: any[] = [];
  error = '';

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['ventas', 'compras', 'gastos'],
    datasets: [{ data: [0, 0, 0], label: 'Importe' }]
  };
  barChartOptions: ChartConfiguration<'bar'>['options'] = { responsive: true };

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Evolución' }]
  };
  lineChartOptions: ChartConfiguration<'line'>['options'] = { responsive: true };

  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['ventas', 'compras', 'gastos'],
    datasets: [{ data: [0, 0, 0] }]
  };
  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = { responsive: true };

  constructor(private rest: RestDataService, private firestore: FirestoreDataService) {}

  ngOnInit(): void {
    forkJoin({
      rest: this.rest.getRecords(),
      firestore: this.firestore.getRecordsRealtime()
    }).subscribe({
      next: (res) => {
        this.records = [...res.rest, ...res.firestore];
        this.total = this.records.reduce((acc, r) => acc + Number(r.amount || 0), 0);
        const ventas = this.records.filter(r => r.category === 'ventas').reduce((a,r) => a + Number(r.amount||0), 0);
        const compras = this.records.filter(r => r.category === 'compras').reduce((a,r) => a + Number(r.amount||0), 0);
        const gastos = this.records.filter(r => r.category === 'gastos').reduce((a,r) => a + Number(r.amount||0), 0);
        this.barChartData.datasets[0].data = [ventas, compras, gastos];
        this.doughnutChartData.datasets[0].data = [ventas, compras, gastos];
        this.lineChartData.labels = this.records.map(r => r.date);
        this.lineChartData.datasets[0].data = this.records.map(r => Number(r.amount||0));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error cargando datos';
        this.loading = false;
      }
    });
  }

  exportCSV(): void {
    const header = 'id,titulo,categoria,importe,fecha\r\n';
    const rows = this.records.map(r => ${r.id},,,,).join('\r\n');
    const csv = '\uFEFF' + header + rows;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'informe.csv';
    link.click();
  }

  exportPDF(): void {
    import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(autoTable => {
        const doc = new jsPDF.default();
        doc.setFontSize(16);
        doc.text('Gestión Pro - Informe', 14, 20);
        doc.setFontSize(10);
        doc.text('Fecha: ' + new Date().toLocaleDateString(), 14, 28);
        const rows = this.records.map(r => [r.id, r.title, r.category, r.amount, r.date]);
        (doc as any).autoTable({
          head: [['ID', 'Título', 'Categoría', 'Importe', 'Fecha']],
          body: rows,
          startY: 35,
        });
        doc.text('Pie de página - Gestión Pro', 14, doc.internal.pageSize.height - 10);
        doc.save('informe.pdf');
      });
    });
  }
}
