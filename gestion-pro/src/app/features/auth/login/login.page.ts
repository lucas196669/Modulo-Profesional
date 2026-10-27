import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  templateUrl: './login.page.html',
})
export class LoginPage {
  form: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async submit(): Promise<void> {
    if (this.form.invalid) return;
    this.error = '';
    try {
      await this.auth.login(this.form.value.email, this.form.value.password);
      if (this.auth.role() === 'admin') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/records']);
      }
    } catch (err: any) {
      this.error = err.message || 'Error de autenticación';
    }
  }
}
