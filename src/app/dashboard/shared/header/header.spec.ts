import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('Header', () => {
  let fixture: ComponentFixture<Header>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [Header],
    }).compileComponents();
    fixture = TestBed.createComponent(Header);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
