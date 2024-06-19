import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navabar',
  templateUrl: './navabar.component.html',
  styleUrls: ['./navabar.component.scss']
})
export class NavabarComponent {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logOut():void{
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Successfully Logout",
      showConfirmButton: false,
      timer: 1500
    });
    return this.authService.logout();
  }
}
