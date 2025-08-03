import { Component, inject } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule, NgModel } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [TitleCasePipe, CurrencyPipe, RouterLink, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

  products: IProduct[] = [];
  searchValue: string = "";
  wishlistItems: IProduct[] = [];

  constructor(private flowbiteService: FlowbiteService) { }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.getProducts();
    this.getWishlist();

  }

  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        console.log(this.products);
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
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  addProductToWislist(id: string) {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getWishlist();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getWishlist() {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistItems = res.data;
        console.log(this.wishlistItems);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  isExist(product: any): boolean {
    return this.wishlistItems.some(item => item.id === product._id);
  }
}
