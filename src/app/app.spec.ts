import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('App', () => {
  let fixture: ComponentFixture<App>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [App],
    }).compileComponents();
    fixture = TestBed.createComponent(App);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
