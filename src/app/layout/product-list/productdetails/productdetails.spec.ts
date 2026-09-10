import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { Productdetails } from './productdetails';
describe('Productdetails', () => {
  let fixture: ComponentFixture<Productdetails>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: () => 'test' },
              data: {
                myProductRes: {
                  data: {
                    _id: '1',
                    name: 'Test',
                    desc: 'Test',
                    price: 1,
                    imgURL: '',
                    isActive: true,
                    isDeleted: false,
                    season: 'summer',
                    slug: 'test',
                    stock: 1,
                    category: 'men',
                    subCategory: 'shirts',
                    salesCount: 0,
                  },
                },
              },
            },
          },
        },
      ],
      imports: [Productdetails],
    }).compileComponents();
    fixture = TestBed.createComponent(Productdetails);
  });
  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
