import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('Login', () => {
  let fixture: ComponentFixture<Login>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [Login],
    }).compileComponents();
    fixture = TestBed.createComponent(Login);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
