import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Checkout } from './checkout';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('Checkout', () => {
  let fixture: ComponentFixture<Checkout>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [Checkout],
    }).compileComponents();
    fixture = TestBed.createComponent(Checkout);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
