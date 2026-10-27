import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import { home, documentText, helpCircle, logIn } from 'ionicons/icons';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public auth: AuthService) {
    addIcons({ home, documentText, helpCircle, logIn });
  }
}
