import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  onLogin(email: string, password: string, role: string): void {


    this.authService.login(email, password, role).subscribe({
      next: () => {
        this.router.navigate(['/home'])
        // Swal.fire({
        //   position: "center",
        //   icon: "success",
        //   title: "Logged in successfully",
        //   showConfirmButton: false,
        //   timer: 1500
        // });
      },
      error: (err) => {
        console.error(err);
        // Swal.fire({
        //   position: "top-end",
        //   icon: "error",
        //   title: "Invalid login credentials",
        //   showConfirmButton: false,
        //   timer: 1500
        // });

      },
    });
  }
}
