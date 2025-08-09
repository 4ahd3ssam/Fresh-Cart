import { Component, ElementRef, inject, input, OnInit, ViewChild } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { ThememodeService } from '../../core/services/thememode/thememode.service';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly themeMode = inject(ThememodeService);
  private readonly cartService = inject(CartService);
  private readonly wishlistservice = inject(WishlistService);


  @ViewChild('mdeBtn') modeBtn!: ElementRef<HTMLInputElement>;

  modeIcon: string = "";
  isLoggedIn = input<boolean>(true);
  cartNumber: number = 0;
  wishlistNumber: number = 0;

  constructor(
    private flowbiteService: FlowbiteService
  ) { }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.cartService.getCartProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.wishlistservice.getWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistservice.wishlistNumber.next(res.length);
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.themeMode.updateHTMLMode();
    this.updateBtn();
    this.cartService.cartNumber.subscribe({
      next: (value) => {
        this.cartNumber = value;
      }
    });
    this.wishlistservice.wishlistNumber.subscribe({
      next: (value) => {
        this.wishlistNumber = value;
      }
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  updateBtn() {
    if (this.themeMode.isDarkMode()) {
      this.modeIcon = "/light-mode.png";
    }
    else {
      console.log("dark now");
      this.modeIcon = "/dark-mode.png";
    }
  }

  handleClick() {
    this.themeMode.updateLocalStorage();
    this.updateBtn();
    this.themeMode.updateHTMLMode();
  }
}
