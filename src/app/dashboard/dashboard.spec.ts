import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('Dashboard', () => {
  let fixture: ComponentFixture<Dashboard>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [Dashboard],
    }).compileComponents();
    fixture = TestBed.createComponent(Dashboard);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
