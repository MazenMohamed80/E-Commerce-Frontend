import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { NotificationService } from './notification-service';
describe('OrderService', () => {
  let service: NotificationService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(NotificationService);
  });
  it('should be created', () => expect(service).toBeTruthy());
});
