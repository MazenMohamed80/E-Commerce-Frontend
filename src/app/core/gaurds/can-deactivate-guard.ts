import { CanDeactivateFn } from '@angular/router';
import { ICanComponentDeactivate } from '../models/canComponentDeactivate.model';
export const canDeactivateGuard: CanDeactivateFn<ICanComponentDeactivate> = (component) =>
  component.canDeactivate ? component.canDeactivate() : true;
