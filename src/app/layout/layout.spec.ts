import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Layout } from './layout';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('Layout', () => {
  let fixture: ComponentFixture<Layout>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [Layout],
    }).compileComponents();
    fixture = TestBed.createComponent(Layout);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
