import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from './product';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('Product', () => {
  let fixture: ComponentFixture<Product>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [Product],
    }).compileComponents();
    fixture = TestBed.createComponent(Product);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
