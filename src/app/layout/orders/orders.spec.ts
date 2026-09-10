import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Orders } from './orders';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('Orders', () => {
  let fixture: ComponentFixture<Orders>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [Orders],
    }).compileComponents();
    fixture = TestBed.createComponent(Orders);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
