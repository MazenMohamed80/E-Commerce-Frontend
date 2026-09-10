import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Userslist } from './userslist';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('Userslist', () => {
  let fixture: ComponentFixture<Userslist>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
      imports: [Userslist],
    }).compileComponents();
    fixture = TestBed.createComponent(Userslist);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
