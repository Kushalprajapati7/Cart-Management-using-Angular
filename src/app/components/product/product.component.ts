import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent {
  products: any = [];
  constructor(private router: Router, private productService: ProductService, private cartServices: CartService) { }
  // productDetail = [
  //   {
  //     id: 1001,
  //     name: 'Laptop',
  //     price: 1200,
  //     description: 'High performance laptop for all your needs.',
  //     imageUrl: 'https://images.unsplash.com/photo-1588620353536-ded12e518f45?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG9wZW4lMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D',
  //     isAvailable: true,
  //     quantity: 1
  //   },
  //   {
  //     id: 1002,
  //     name: 'Smartphone',
  //     price: 800,
  //     description: 'Latest smartphone with advanced features.',
  //     imageUrl: 'https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg',
  //     isAvailable: false,
  //     quantity: 1
  //   },
  //   {
  //     id: 1003,
  //     name: 'Headphones',
  //     price: 150,
  //     description: 'Comfortable headphones with great sound',
  //     imageUrl: 'https://img.freepik.com/free-photo/shiny-black-headphones-reflect-golden-nightclub-lights-generated-by-ai_188544-10148.jpg',
  //     isAvailable: false,
  //     quantity: 1
  //   },
  //   {
  //     id: 1004,
  //     name: 'Monitor',
  //     price: 300,
  //     description: 'High resolution monitor for a better viewing',
  //     imageUrl: 'https://m.media-amazon.com/images/I/917Js+Enk+L.jpg',
  //     isAvailable: true,
  //     quantity: 1
  //   },
  //   {
  //     id: 1005,
  //     name: 'Keyboard',
  //     price: 50,
  //     description: 'Mechanical keyboard with responsive keys .   ',
  //     imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2021/11/YC/AY/KI/137831256/lenovo-300-usb-keyboard.jpg',
  //     isAvailable: false,
  //     quantity: 1
  //   },
  //   {
  //     id: 1006,
  //     name: 'Mouse',
  //     price: 10,
  //     description: 'Mechanical keyboard with responsive keys.',
  //     imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_1b33fcec-0718-4fe5-a230-e5b2ac9a8a3e?wid=488&hei=488&fmt=pjpeg',
  //     isAvailable: true,
  //     quantity: 1
  //   }
  // ];
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products
        console.log(products);

      }
    )
  }
  increaseQuantity(product: any) {
    product.quantity++;
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  addToCart(products: any): any {
    const profileId = localStorage.getItem('profileID')
    if (!profileId) {
      return
    }
    console.log(profileId);
    console.log(products._id);
    this.cartServices.addToCart(profileId, products._id, products.quantity).subscribe(
      response => {
        console.log('Product Added Successfully', response);
      },
      error => {
        console.error('Error adding product', error);
      }
    )

  }

  showCart() {
    const profileId = localStorage.getItem('profileID')
    this.router.navigate([`/cart/${profileId}`]);
  }

}
