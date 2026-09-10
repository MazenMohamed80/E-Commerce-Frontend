import { TestBed } from '@angular/core/testing';
import { productResolver } from './product';
describe('productResolver', () => {
  it('should be created', () =>
    expect(TestBed.runInInjectionContext(() => productResolver as unknown)).toBeTruthy());
});
