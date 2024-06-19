import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductComponent } from './components/product/product.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptorInterceptor } from './services/auth-interceptor.interceptor';
import { AgGridAngular } from 'ag-grid-angular';
import { NavabarComponent } from './components/navabar/navabar.component';
import { CartComponent } from './components/cart/cart.component'; 
 



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    ProductComponent,
    NavabarComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgGridAngular

  ],
  providers: [
    AuthService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    }
    ,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
