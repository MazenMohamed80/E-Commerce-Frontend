import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Notfound } from './notfound';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('Notfound', () => {
  let fixture: ComponentFixture<Notfound>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [Notfound],
    }).compileComponents();
    fixture = TestBed.createComponent(Notfound);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
