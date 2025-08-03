import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);
  userData: any;
  constructor(private httpClient: HttpClient) { }

  signUp(data: object): Observable<any> {
    return this.httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup", data);
  }

  signIn(data: object): Observable<any> {
    return this.httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin", data);
  }

  getUserData(): any {
    this.userData = jwtDecode(localStorage.getItem("token")!);
    return this.userData;
  }

  signOut() {
    localStorage.removeItem("token");
    this.userData = null;
    this.router.navigate(["/login"]);
  }
}
