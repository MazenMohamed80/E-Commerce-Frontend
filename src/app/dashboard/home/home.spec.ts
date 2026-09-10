import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardHome } from './home';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('DashboardHome', () => {
  let fixture: ComponentFixture<DashboardHome>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [DashboardHome],
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardHome);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
