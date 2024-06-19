import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartData: any;
  constructor(private cartServices: CartService, private router :Router) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    const profileId = localStorage.getItem('profileID')
    if (!profileId) {
      return
    }
    this.cartServices.showCart(profileId).subscribe(
      cart => {
        this.cartData = cart
        console.log(cart);
        if(!this.cartData.cart){
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Your Cart is Empty !",
            showConfirmButton: false,
            timer: 1500
          });
        this.router.navigate([`/product`]);
        }
      },
      error => {
        console.error('Error showing Cart', error);
      }
    )
  }


  backToProducts(){
    this.router.navigate([`/product`]);
  }
}
