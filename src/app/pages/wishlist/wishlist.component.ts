import { Component, inject } from '@angular/core';
import { initFlowbite } from 'flowbite/lib/esm/components';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { MessageService } from '../../core/services/toastr/message.service';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  private readonly wishlistService = inject(WishlistService);
  private readonly toastr = inject(MessageService);

  wishlist: IProduct[] = [];

  constructor(private flowbiteService: FlowbiteService) { }
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.getWishlist();
  }


  getWishlist() {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        console.log(res.data, "wishlist");
        this.wishlist = res.data;
        this.wishlistService.wishlistNumber.next(this.wishlist.length);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  removeWishlistItem(id: string): void {
    this.wishlistService.removeWishlistItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getWishlist();
        this.toastr.sendSuccess("Product removed successfully from your wishlist!");
      },
      error: (err) => {
        console.log(err);
        this.toastr.sendError(err.message);
      }
    })
  }
}
