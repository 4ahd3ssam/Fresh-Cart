import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  myToken: string = localStorage.getItem("token")!;

  constructor(private readonly httpClient: HttpClient) { }

  checkoutSession(id: string, shippingData: object): Observable<any> {
    return this.httpClient.post(`${environment.baseURL}/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`, {
      "shippingAddress": shippingData
    }
    )
  }
}
