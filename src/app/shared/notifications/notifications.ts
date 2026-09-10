import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { INotification, NotificationService } from '../../core/services/notification-service';
import { Observable } from 'rxjs';

@Component({
  imports: [AsyncPipe],
  selector: 'app-notifications',
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications implements OnInit {
  notifications$!: Observable<INotification[]>;
  constructor(private _notificationService: NotificationService) {}
  dismiss(id: number) {
    this._notificationService.dismiss(id);
  }
  ngOnInit(): void {
    this.notifications$ = this._notificationService.notifications$;
  }
}
