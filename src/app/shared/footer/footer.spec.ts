import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('Footer', () => {
  let fixture: ComponentFixture<Footer>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [Footer],
    }).compileComponents();
    fixture = TestBed.createComponent(Footer);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
