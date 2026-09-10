import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';
import { userGuard } from './user-guard';
describe('userGuard', () => {
  const executeGuard: CanMatchFn = (...p) => TestBed.runInInjectionContext(() => userGuard(...p));
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => expect(executeGuard).toBeTruthy());
});
