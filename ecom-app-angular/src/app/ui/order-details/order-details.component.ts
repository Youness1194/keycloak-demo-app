import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../models/models';

@Component({
  selector: 'app-order-details',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);

  protected readonly orderId = this.route.snapshot.paramMap.get('id');
  protected readonly order = signal<Order | null>(null);
  protected readonly total = computed(
    () => this.order()?.productItems.reduce((sum, pi) => sum + pi.price * pi.quantity, 0) ?? 0,
  );

  ngOnInit() {
    this.http.get<Order>('http://localhost:8088/api/orders/' + this.orderId).subscribe({
      next: (data) => this.order.set(data),
      error: (err) => console.error(err),
    });
  }
}
