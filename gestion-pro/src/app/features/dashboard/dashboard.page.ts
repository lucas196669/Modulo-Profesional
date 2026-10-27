import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: '<ion-header><ion-toolbar><ion-title>Gestión Pro</ion-title></ion-toolbar></ion-header><ion-content class=\"ion-padding\"><h1>Dashboard</h1></ion-content>',
})
export class DashboardPage {}
