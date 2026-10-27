import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-stat-widget',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './stat-widget.component.html',
  styleUrls: ['./stat-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatWidgetComponent {
  @Input() title = '';
  @Input() value: string | number = '';
  @Input() variation = '';
  @Input() icon = 'analytics';
}
