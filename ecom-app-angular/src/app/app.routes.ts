import { Routes } from '@angular/router';
import { canActivateAuthRole } from './guards/auth.guard';
import { ProductsComponent } from './ui/products/products.component';
import { CustomersComponent } from './ui/customers/customers.component';
import { OrdersComponent } from './ui/orders/orders.component';
import { OrderDetailsComponent } from './ui/order-details/order-details.component';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'ADMIN' },
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'USER' },
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'USER' },
  },
  {
    path: 'order-details/:id',
    component: OrderDetailsComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'USER' },
  },
];
