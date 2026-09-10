import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Orderslist } from './orderslist';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('Orderslist', () => {
  let fixture: ComponentFixture<Orderslist>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [Orderslist],
    }).compileComponents();
    fixture = TestBed.createComponent(Orderslist);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
