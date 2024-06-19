import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    private  apiUrl = 'http://localhost:3000/api/cart'
  constructor(private http:HttpClient, private authService:AuthService) {}

  addToCart(profileId: string, productId: string, quantity: number): Observable<any>{
    const headers = this.authService.getHeaders();
    const body = {profileId, productId, quantity};
    console.log(body, "body");
    
    return this.http.post(`${this.apiUrl}/addToCart/${productId}`, body, {headers})
  }

  showCart(profileId:string):Observable<any>{
    const headers = this.authService.getHeaders();
    return this.http.get(`${this.apiUrl}/showCart/${profileId}` , {headers})
  }
}


