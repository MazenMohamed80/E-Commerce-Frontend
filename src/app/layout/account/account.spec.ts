import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Account } from './account';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('Account', () => {
  let fixture: ComponentFixture<Account>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [Account],
    }).compileComponents();
    fixture = TestBed.createComponent(Account);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
