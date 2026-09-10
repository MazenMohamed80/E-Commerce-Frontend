import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ICanComponentDeactivate } from '../../core/models/canComponentDeactivate.model';
import { AuthService } from '../../core/services/auth-service';
import { UserService } from '../../core/services/user-service';
import { IUser, IUserRes } from '../../core/models/auth.model';
import { NotificationService } from '../../core/services/notification-service';
@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-signup',
  styleUrl: './signup.css',
  templateUrl: './signup.html',
})
export class Signup implements ICanComponentDeactivate {
  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    private _notificationService: NotificationService,
  ) {}
  error = '';
  loading = false;
  signup = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
    gender: new FormControl<'male' | 'female'>('male', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    nationalId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    DOB: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
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
  onSubmit() {
    if (this.signup.invalid) {
      this.signup.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = '';
    this._authService.signup(this.signup.getRawValue()).subscribe({
      next: (res: IUserRes) => {
        if (res?.data) this._userService.setProfile(res.data);
        this.signup.markAsPristine();
        this._notificationService.success(res.message || 'Account created');
        this._router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.error = this.getErrorMessage(err) || 'Could not create account';
        console.log(err);
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
  }
  canDeactivate(): boolean {
    return this.signup.dirty
      ? confirm('Are you sure you want to leave without finishing signup?')
      : true;
  }
}
