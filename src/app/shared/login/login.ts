import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { ILoginData } from '../../core/models/auth.model';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  constructor(
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
  ) {}
  error = '';
  loading = false;
  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
  private getErrorMessage(err: HttpErrorResponse): string {
    const body = err?.error;
    if (typeof body === 'string') return body;
    if (body?.error && typeof body.error === 'string') return body.error;
    if (body?.message && typeof body.message === 'string') return body.message;
    if (body?.errors && typeof body.errors === 'object') {
      const first = Object.values(body.errors)[0] as any;
      if (first?.message) return first.message;
    }
    return err?.message || '';
  }
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = '';
    this._authService.login(this.loginForm.getRawValue() as ILoginData).subscribe({
      next: (res) => {
        console.log(res.message);
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.error = this.getErrorMessage(err) || 'Login failed';
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
  }
}
