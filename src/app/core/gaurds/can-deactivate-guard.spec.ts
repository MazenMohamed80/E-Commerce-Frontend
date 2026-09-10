import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';
import { canDeactivateGuard } from './can-deactivate-guard';
import { ICanComponentDeactivate } from '../models/canComponentDeactivate.model';
describe('canDeactivateGuard', () => {
  const executeGuard: CanDeactivateFn<ICanComponentDeactivate> = (...p) =>
    TestBed.runInInjectionContext(() => canDeactivateGuard(...p));
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => expect(executeGuard).toBeTruthy());
});
