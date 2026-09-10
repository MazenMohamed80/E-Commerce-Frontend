import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Signup } from './signup';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('Signup', () => {
  let fixture: ComponentFixture<Signup>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [Signup],
    }).compileComponents();
    fixture = TestBed.createComponent(Signup);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
