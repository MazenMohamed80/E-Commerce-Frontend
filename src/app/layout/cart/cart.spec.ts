import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cart } from './cart';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('Cart', () => {
  let fixture: ComponentFixture<Cart>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [Cart],
    }).compileComponents();
    fixture = TestBed.createComponent(Cart);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
