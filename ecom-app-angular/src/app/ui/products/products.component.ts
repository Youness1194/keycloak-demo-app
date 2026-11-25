import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/models';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly http = inject(HttpClient);
  protected readonly products = signal<Product[]>([]);

  ngOnInit() {
    this.http.get<Product[]>('http://localhost:8087/api/products').subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error(err),
    });
  }
}
