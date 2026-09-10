import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Reports } from './reports';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('Reports', () => {
  let fixture: ComponentFixture<Reports>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [Reports],
    }).compileComponents();
    fixture = TestBed.createComponent(Reports);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
