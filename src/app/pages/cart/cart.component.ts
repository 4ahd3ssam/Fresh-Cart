import { Component, inject, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { initFlowbite } from 'flowbite';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MessageService } from '../../core/services/toastr/message.service';
import { CheckoutComponent } from "../checkout/checkout.component";

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, CheckoutComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService);
  private readonly toastr = inject(MessageService);
  cartDetails: ICart = {} as ICart;

  isOpenPayment: boolean = false;


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
        this.cartService.cartNumber.next(res.numOfCartItems);
        this.cartDetails = res.data;
        this.toastr.sendSuccess("Item has been removed successfully!");
      },
      error: (err) => {
        console.log(err);
        this.toastr.sendError(err.message);
      }
    })
  }

  updateProductQuantity(id: string, quantity: any): void {
    this.cartService.updateProductQuantity(id, quantity).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
        this.cartService.cartNumber.next(res.numOfCartItems);
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
        console.log(this.cartDetails);
        this.cartDetails.totalCartPrice = 0;
        this.cartService.cartNumber.next(0);
        this.toastr.sendSuccess("Cart has been cleared successfully");
      },
      error: (err) => {
        console.log(err);
        this.toastr.sendError(err.message);
      }
    })
  }

  openPayment(): void {
    this.isOpenPayment = true;
    document.body.style.overflow = 'hidden';
  }
  closePayment(): void {
    this.isOpenPayment = false;
    document.body.style.overflow = 'auto';
  }

}
