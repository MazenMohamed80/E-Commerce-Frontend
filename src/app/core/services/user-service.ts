import { Injectable, Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/env';
import { IAddress, IUser } from '../models/auth.model';
import { IAddressUpdateRes, IBlockRes, IUsersRes } from '../models/user.model';

@Service()
export class UserService {
  private _http = inject(HttpClient);
  private apiURL = environment.apiURL + 'user';
  private profileSubject = new BehaviorSubject<IUser | null>(this.readProfile());
  profile$ = this.profileSubject.asObservable();
  createAdmin(data: any) {
    return this._http.post<any>(`${this.apiURL}/admin`, data);
  }
  getAllUsers() {
    return this._http.get<IUsersRes>(this.apiURL);
  }
  toggleBlockUser(id: string) {
    return this._http.patch<IBlockRes>(`${this.apiURL}/${id}/block`, {});
  }
  updateAddressDeliveryFee(userId: string, title: string, deliveryFee: number) {
    return this._http.patch<IAddressUpdateRes>(
      `${this.apiURL}/${userId}/address/${encodeURIComponent(title)}/delivery-fee`,
      { deliveryFee },
    );
  }
  addAddress(address: Pick<IAddress, 'title' | 'address' | 'isDefault'>) {
    return this._http.post(`${this.apiURL}/address`, address);
  }
  updateAddress(title: string, address: Pick<IAddress, 'title' | 'address' | 'isDefault'>) {
    return this._http.put<any>(`${this.apiURL}/address/${encodeURIComponent(title)}`, address);
  }
  setProfile(profile: IUser) {
    localStorage.setItem('profile', JSON.stringify(profile));
    this.profileSubject.next(profile);
  }
  replaceAddress(oldTitle: string, address: IAddress) {
    const profile = this.profileSubject.value;
    if (!profile) return;
    const addresses = profile.addresses.map((a) =>
      a.title === oldTitle
        ? { ...a, ...address }
        : address.isDefault
          ? { ...a, isDefault: false }
          : a,
    );
    this.setProfile({ ...profile, addresses });
  }
  private readProfile(): IUser | null {
    try {
      return JSON.parse(localStorage.getItem('profile') || 'null');
    } catch {
      return null;
    }
  }
}
