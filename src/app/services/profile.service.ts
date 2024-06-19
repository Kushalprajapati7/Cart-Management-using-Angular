import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private apiUrl = "http://localhost:3000/api/profile";

    constructor(private http: HttpClient, private authService: AuthService) {}

    createProfile(name: string, email: string, dob: Date, gender: string): Observable<any> {
        // const headers = this.authService.getHeaders();
        const body = { name, email, dob, gender };
        // console.log(body);
        return this.http.post(`${this.apiUrl}/addProfile`, body);

    }

    getProfiles(): Observable<any> {
        const headers = this.authService.getHeaders();
        console.log(headers);
        
        return this.http.get(`${this.apiUrl}/showProfiles`, {headers});
    }

    updateProfile(id: string, updatedProfile: any):Observable<any> {
        const headers = this.authService.getHeaders();
        return this.http.put(`${this.apiUrl}/updateProfile/${id}`, updatedProfile, { headers });

    }

    deleteProfile(id: string): Observable<any> {
        const headers = this.authService.getHeaders();
        return this.http.delete(`${this.apiUrl}/deleteProfile/${id}`, { headers });
    }
}
