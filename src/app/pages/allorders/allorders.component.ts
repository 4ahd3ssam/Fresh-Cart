import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { IOrder } from '../../shared/interfaces/iorder';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly ordersService = inject(OrdersService);
  orders: IOrder[] = [];

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    let id: any = this.authService.getUserData().id;
    this.ordersService.getAllOrders(id).subscribe({

      next: (res) => {
        console.log(res);
        this.orders = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
