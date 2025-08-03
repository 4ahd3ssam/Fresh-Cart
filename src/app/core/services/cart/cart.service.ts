import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  currentToken = localStorage.getItem("token")!;
  constructor(private readonly httpClient: HttpClient) { }

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseURL}/api/v1/cart`, {
      "productId": id
    }, {
      headers: {
        token: this.currentToken
      }
    })
  }

  getCartProducts(): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}/api/v1/cart`, {
      headers: {
        token: this.currentToken
      }
    })
  }

  removeCartItem(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseURL}/api/v1/cart/${id}`, {
      headers: {
        token: this.currentToken
      }
    })
  }

  updateProductQuantity(id: string, quantity: any): Observable<any> {
    return this.httpClient.put(`${environment.baseURL}/api/v1/cart/${id}`, {
      "count": quantity
    }, {
      headers: {
        token: this.currentToken
      }
    })
  }


  clearCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseURL}/api/v1/cart`, {
      headers: {
        token: this.currentToken
      }
    })
  }



}
