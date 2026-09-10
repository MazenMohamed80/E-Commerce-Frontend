import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestimonialService } from './testimonial-service';
describe('TestmonialService', () => {
  let service: TestimonialService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(TestimonialService);
  });
  it('should be created', () => expect(service).toBeTruthy());
});
