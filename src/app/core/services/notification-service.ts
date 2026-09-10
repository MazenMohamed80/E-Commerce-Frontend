import { Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface INotification {
  id: number;
  type: NotificationType;
  message: string;
}

@Service()
export class NotificationService {
  private subject = new BehaviorSubject<INotification[]>([]);

  notifications$ = this.subject.asObservable();

  private nextId = 0;

  show(message: string, type: NotificationType = 'info', duration = 3500) {
    const notification = {
      id: ++this.nextId,
      type,
      message,
    };

    this.subject.next([...this.subject.value, notification]);

    window.setTimeout(() => this.dismiss(notification.id), duration);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error', 5000);
  }

  warning(message: string) {
    this.show(message, 'warning', 4500);
  }

  info(message: string) {
    this.show(message, 'info');
  }

  dismiss(id: number) {
    this.subject.next(this.subject.value.filter((item) => item.id !== id));
  }
}
