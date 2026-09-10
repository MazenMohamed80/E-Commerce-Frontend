import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user-service';
import { NotificationService } from '../../core/services/notification-service';
import { IUserSummary } from '../../core/models/user.model';
@Component({
  imports: [FormsModule],
  selector: 'app-userslist',
  styleUrl: './userslist.css',
  templateUrl: './userslist.html',
})
export class Userslist implements OnInit {
  constructor(
    private _userService: UserService,
    private _cdr: ChangeDetectorRef,
    private _notificationService: NotificationService,
  ) {}
  users: IUserSummary[] = [];
  error = '';
  loading = true;
  newAdmin = {
    name: '',
    email: '',
    password: '',
    gender: 'male',
    phone: '',
    nationalId: '',
    DOB: '',
  };
  showAdminForm = false;
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this._userService.getAllUsers().subscribe({
      next: (r) => {
        this.users = r.data;
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (e) => {
        this.error = e?.error?.error || e?.error?.message || 'Could not load users';
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
  }
  createAdmin() {
    this.error = '';
    this._userService.createAdmin(this.newAdmin).subscribe({
      next: (res) => {
        this._notificationService.success(res?.message || 'Admin account created successfully');
        this.showAdminForm = false;
        this.newAdmin = {
          name: '',
          email: '',
          password: '',
          gender: 'male',
          phone: '',
          nationalId: '',
          DOB: '',
        };
        this.load();
      },
      error: (e) => {
        this.error = e?.error?.error || e?.error?.message || 'Could not create admin';
        this._cdr.detectChanges();
      },
    });
  }
  editingAddress: { userId: string; title: string; fee: number } | null = null;

  startFeeEdit(user: IUserSummary, address: NonNullable<IUserSummary['addresses']>[number]) {
    this.editingAddress = { userId: user._id, title: address.title, fee: address.deliveryFee };
  }

  cancelFeeEdit() {
    this.editingAddress = null;
  }

  saveFeeEdit(user: IUserSummary, address: NonNullable<IUserSummary['addresses']>[number]) {
    if (!this.editingAddress) return;
    const fee = Number(this.editingAddress.fee);
    if (!Number.isFinite(fee) || fee < 0) {
      this.error = 'Delivery fee must be a non-negative number';
      return;
    }
    this._userService.updateAddressDeliveryFee(user._id, address.title, fee).subscribe({
      next: (r) => {
        address.deliveryFee = r.data.deliveryFee ?? fee;
        this.editingAddress = null;
        this._notificationService.success(r.message || 'Delivery fee updated successfully');
        this._cdr.detectChanges();
      },
      error: (e) => {
        this.error = e?.error?.error || 'Could not update delivery fee';
        this._notificationService.error(this.error);
        this._cdr.detectChanges();
      },
    });
  }

  toggle(user: IUserSummary) {
    const action = user.isBlocked ? 'unblock' : 'block';
    if (!confirm(`Are you sure you want to ${action} ${user.name}?`)) return;
    this._userService.toggleBlockUser(user._id).subscribe({
      next: (r) => {
        user.isBlocked = r.isBlocked;
        this._notificationService.success(
          r.message ||
            (user.isBlocked ? 'User blocked successfully' : 'User unblocked successfully'),
        );
        this._cdr.detectChanges();
      },
      error: (e) => {
        this.error = e?.error?.error || 'Could not update user';
        this._notificationService.error(this.error);
        this._cdr.detectChanges();
      },
    });
  }
}
