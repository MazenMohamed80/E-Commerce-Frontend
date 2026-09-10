export type TestimonialStatus = 'pending' | 'approved' | 'declined';

export interface ITestimonialUser {
  _id?: string;
  name: string;
  email?: string;
}

export interface ITestimonial {
  _id: string;
  user: string | ITestimonialUser;
  message: string;
  rating: number;
  status: TestimonialStatus;
  isApproved: boolean;
  isNew: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ITestimonialsRes {
  message: string;
  data: ITestimonial[];
}

export interface ITestimonialRes {
  message: string;
  data: ITestimonial;
}

export interface ITestimonialNotificationRes {
  message: string;
  count: number;
  data: ITestimonial[];
}
