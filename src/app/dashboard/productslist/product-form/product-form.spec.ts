import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductForm } from './product-form';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('ProductForm', () => {
  let fixture: ComponentFixture<ProductForm>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [ProductForm],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductForm);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
