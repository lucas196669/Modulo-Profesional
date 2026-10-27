import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { debounceTime, distinctUntilChanged, map, switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-register-record',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  templateUrl: './register-record.page.html',
  styleUrls: ['./register-record.page.scss'],
})
export class RegisterRecordPage {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email], [this.emailExistsValidator()]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required]],
      amount: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) return of(null);
      return of(control.value).pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(email => this.auth.emailExists(email)),
        map(exists => (exists ? { emailExists: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  submit(): void {
    if (this.form.invalid) return;
    this.router.navigate(['/records']);
  }
}
