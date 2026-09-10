import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardTestimonials } from './testimonials';

describe('DashboardTestimonials', () => {
  let component: DashboardTestimonials;
  let fixture: ComponentFixture<DashboardTestimonials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DashboardTestimonials] }).compileComponents();
    fixture = TestBed.createComponent(DashboardTestimonials);
    component = fixture.componentInstance;
  });

  it('creates', () => expect(component).toBeTruthy());
});
