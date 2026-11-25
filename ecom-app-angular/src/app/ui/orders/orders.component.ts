import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Order } from '../../models/models';

@Component({
  selector: 'app-orders',
  imports: [DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  protected readonly orders = signal<Order[]>([]);

  ngOnInit() {
    this.http.get<Order[]>('http://localhost:8088/api/orders').subscribe({
      next: (data) => this.orders.set(data),
      error: (err) => console.error(err),
    });
  }

  protected getOrderDetails(o: Order) {
    this.router.navigateByUrl('/order-details/' + o.id);
  }
}
