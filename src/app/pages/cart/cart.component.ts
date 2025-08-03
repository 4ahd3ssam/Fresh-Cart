import { Component, inject, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { initFlowbite } from 'flowbite';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService);
  cartDetails: ICart = {} as ICart

  constructor(private flowbiteService: FlowbiteService) { }
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });


    this.cartService.getCartProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
        localStorage.setItem("cartID", this.cartDetails._id);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  removeCartItem(id: string): void {
    this.cartService.removeCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  updateProductQuantity(id: string, quantity: any): void {
    this.cartService.updateProductQuantity(id, quantity).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = {} as ICart;
        console.log(this.cartDetails)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
