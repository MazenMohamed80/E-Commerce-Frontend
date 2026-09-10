import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Notifications } from './notifications';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('Notfound', () => {
  let fixture: ComponentFixture<Notifications>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [Notifications],
    }).compileComponents();
    fixture = TestBed.createComponent(Notifications);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
