import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user-service';
import { IAddress, IUser } from '../../core/models/auth.model';
@Component({
  imports: [FormsModule],
  selector: 'app-account',
  styleUrl: './account.css',
  templateUrl: './account.html',
})
export class Account implements OnInit {
  constructor(
    private _userService: UserService,
    private _cdr: ChangeDetectorRef,
  ) {}
  profile: IUser | null = null;
  message = '';
  error = '';
  editingTitle = '';
  form: Pick<IAddress, 'title' | 'address' | 'isDefault'> = {
    title: '',
    address: '',
    isDefault: false,
  };
  ngOnInit() {
    this._userService.profile$.subscribe((profile) => {
      this.profile = profile;
      this._cdr.detectChanges();
    });
  }
  addAddress() {
    this.message = this.error = '';
    this._userService.addAddress(this.form).subscribe({
      next: (res: any) => {
        this.message = res.message;
        if (res.data) this._userService.setProfile(res.data);
        this.form = { title: '', address: '', isDefault: false };
        this._cdr.detectChanges();
      },
      error: (err) => {
        this.error = err?.error?.error || err?.error?.message || 'Could not add address';
        this._cdr.detectChanges();
      },
    });
  }
  edit(address: IAddress) {
    this.editingTitle = address.title;
    this.form = { title: address.title, address: address.address, isDefault: address.isDefault };
  }
  updateAddress() {
    this.message = this.error = '';
    this._userService.updateAddress(this.editingTitle, this.form).subscribe({
      next: (res) => {
        this.message = res.message;
        this._userService.replaceAddress(this.editingTitle, res.data);
        this.editingTitle = '';
        this.form = { title: '', address: '', isDefault: false };
        this._cdr.detectChanges();
      },
      error: (err) => {
        this.error = err?.error?.error || err?.error?.message || 'Could not update address';
        this._cdr.detectChanges();
      },
    });
  }
}
