import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

export interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string;
}

@Injectable({
    providedIn: "root",
})

export class ProductService {

    private apiUrl = "http://localhost:3000/api/product";

    constructor(private http: HttpClient, private authService: AuthService) { }

    getProducts(): Observable<any> {
        const headers = this.authService.getHeaders();
        return this.http.get<Product[]>(`${this.apiUrl}/showProducts`, { headers });

    }


}