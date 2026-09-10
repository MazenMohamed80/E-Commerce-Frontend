import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductList } from './product-list';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('ProductList', () => {
  let fixture: ComponentFixture<ProductList>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [ProductList],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductList);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
