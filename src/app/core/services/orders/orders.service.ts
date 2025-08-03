import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private readonly httpClient: HttpClient) { }

  getAllOrders(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}/api/v1/orders/user/${id}`)
  }
}
