import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { MessageService } from '../../core/services/toastr/message.service';

@Component({
  selector: 'app-details',
  imports: [TitleCasePipe, CurrencyPipe, DatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(MessageService);

  productId: string = "";
  productDetails: IProduct | null = null;


  constructor(
    private flowbiteService: FlowbiteService
  ) { }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get("id")!;
        this.productsService.getProductDetails(this.productId).subscribe({
          next: (res) => {
            this.productDetails = res.data;
            console.log(this.productDetails)
          },
          error: (err) => {
            console.log(err);
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addProductToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.cartNumber.next(res.numOfCartItems);
        this.toastr.sendSuccess("Product added to cart successfully!");
      },
      error: (err) => {
        console.log(err);
        this.toastr.sendError(err.message);
      }
    })
  }
}
