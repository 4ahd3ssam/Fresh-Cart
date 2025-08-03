import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {
  constructor(private httpClient: HttpClient) { }

  forgotPassword(email: any): Observable<any> {
    return this.httpClient.post(`${environment.baseURL}/api/v1/auth/forgotPasswords`, email)
  }

  verifyCode(resetCode: any): Observable<any> {
    return this.httpClient.post(`${environment.baseURL}/api/v1/auth/verifyResetCode`, resetCode)
  }

  resetPassword(data: any): Observable<any> {
    return this.httpClient.put(`${environment.baseURL}/api/v1/auth/resetPassword`, data)
  }
}
