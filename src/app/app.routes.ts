import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './layout/home/home';
import { ProductList } from './layout/product-list/product-list';
import { Productdetails } from './layout/product-list/productdetails/productdetails';
import { Cart } from './layout/cart/cart';
import { Checkout } from './layout/checkout/checkout';
import { Account } from './layout/account/account';
import { Orders } from './layout/orders/orders';
import { Testimonials } from './layout/testimonials/testimonials';
import { Login } from './shared/login/login';
import { Signup } from './shared/signup/signup';
import { Notfound } from './shared/notfound/notfound';
import { Dashboard } from './dashboard/dashboard';
import { DashboardHome } from './dashboard/home/home';
import { Userslist } from './dashboard/userslist/userslist';
import { Productslist } from './dashboard/productslist/productslist';
import { Orderslist } from './dashboard/orderslist/orderslist';
import { Reports } from './dashboard/reports/reports';
import { DashboardTestimonials } from './dashboard/testimonials/testimonials';
import { adminGuard } from './core/gaurds/admin-guard';
import { userGuard } from './core/gaurds/user-guard';
import { canDeactivateGuard } from './core/gaurds/can-deactivate-guard';
import { productResolver } from './core/resolver/product';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'products-list', component: ProductList },
      {
        path: 'products-list/:slug',
        component: Productdetails,
        resolve: { myProductRes: productResolver },
      },
      { path: 'cart', component: Cart },
      { path: 'checkout', component: Checkout, canMatch: [userGuard] },
      { path: 'account', component: Account, canMatch: [userGuard] },
      { path: 'orders', component: Orders, canMatch: [userGuard] },
      { path: 'testimonials', component: Testimonials, canMatch: [userGuard] },
    ],
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardHome },
      { path: 'users-list', component: Userslist },
      { path: 'products-list', component: Productslist },
      { path: 'orders-list', component: Orderslist },
      { path: 'reports', component: Reports },
      { path: 'testimonials', component: DashboardTestimonials },
    ],
  },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup, canDeactivate: [canDeactivateGuard] },
  { path: '**', component: Notfound },
];
