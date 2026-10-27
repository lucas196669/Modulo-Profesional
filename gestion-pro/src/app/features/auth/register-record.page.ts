import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SupabaseService } from '../../../core/services/supabase.service';
import { debounceTime, distinctUntilChanged, map, switchMap, of, catchError } from 'rxjs';

@Component({
  selector: 'app-register-record',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  templateUrl: './register-record.page.html',
})
export class RegisterRecordPage {
  form: FormGroup;

  constructor(private fb: FormBuilder, private supabase: SupabaseService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email], [this.emailExistsValidator()]],
      title: ['', [Validators.required]],
      amount: [0, [Validators.required]]
    });
  }

  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) return of(null);
      return of(control.value).pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(email => fromPromise(this.supabase.emailExists(email))),
        map(exists => (exists ? { emailExists: true } : null)),
        catchError(() => of(null))
      );
    };
  }
}

function fromPromise(p: Promise<boolean>) {
  return new (require('rxjs').Observable)(function(sub: any){ p.then(v=>{sub.next(v);sub.complete();}).catch(e=>{sub.next(false);sub.complete();}); });
}
