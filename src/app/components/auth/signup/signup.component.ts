import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
username: any;
email: any;
password: any;
profileForm: any;
  constructor(private authService: AuthService, private router: Router) {}

  onSignup(username: string, email: string, password: string, role:string): void {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "User Registred",
      showConfirmButton: false,
      timer: 1000
    }),
    this.authService.register(username, email, password,role).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error(err),
    });
  }
}
