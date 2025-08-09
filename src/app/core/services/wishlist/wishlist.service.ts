import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  currentToken = localStorage.getItem("token")!;
  wishlistNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private readonly httpClient: HttpClient) { }

  addProductToWishlist(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseURL}/api/v1/wishlist`, {
      "productId": id
    }, {
      headers: {
        token: this.currentToken
      }
    })
  }

  getWishlist(): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}/api/v1/wishlist`, {
      headers: {
        token: this.currentToken
      }
    })
  }

  removeWishlistItem(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseURL}/api/v1/wishlist/${id}`, {
      headers: {
        token: this.currentToken
      }
    })
  }
}
