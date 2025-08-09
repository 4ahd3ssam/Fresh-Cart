import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  currentToken = localStorage.getItem("token")!;
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private readonly httpClient: HttpClient) { }

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseURL}/api/v1/cart`, {
      "productId": id
    })
  }

  getCartProducts(): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}/api/v1/cart`)
  }

  removeCartItem(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseURL}/api/v1/cart/${id}`)
  }

  updateProductQuantity(id: string, quantity: any): Observable<any> {
    return this.httpClient.put(`${environment.baseURL}/api/v1/cart/${id}`, {
      "count": quantity
    })
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseURL}/api/v1/cart`)
  }
}
