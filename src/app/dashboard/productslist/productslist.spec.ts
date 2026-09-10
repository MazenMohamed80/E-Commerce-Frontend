import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Productslist } from './productslist';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('Productslist', () => {
  let fixture: ComponentFixture<Productslist>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [Productslist],
    }).compileComponents();
    fixture = TestBed.createComponent(Productslist);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
