import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CoreService } from '../../core/core.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginObj: Login;
  constructor(
    private http: HttpClient,
    private router: Router,
    private _coreService: CoreService
  ) {
    this.loginObj = new Login();
  }
  //code for login with backend API 
  // onLogin() {

  //   this.http.post('https:/localhost/api/v1/login', this.loginObj).subscribe(
  //     (res:any)=>{
  //     if(res.result) {
  //       alert("Login Success");
  //       localStorage.setItem('karmaTestToken', res.data.token)
  //       this.router.navigateByUrl('/dashboard')
  //     } else {
  //       alert(res.message)
  //     }
  //   })
  // }
  // onLogin() {
  //   let email: string = "geeth@karma.com";
  //   let password: string = "geeth@karma";

  //   if (this.loginObj.EmailId == email && this.loginObj.Password == password) {
  //     this._coreService.openSnackBar('Login Success!', 'done');
  //     this.router.navigateByUrl('/sales-list')
  //   } else {
  //     this._coreService.openSnackBar('Login faild !', 'done');
  //   }

  // }
  onLogin(loginForm: NgForm) {
    if (loginForm.valid) {
      const email = "geeth@karma.com";
      const password = "geeth@karma";

      if (this.loginObj.EmailId === email && this.loginObj.Password === password) {
        alert("Login Success");
        this.router.navigateByUrl('/sales-list');
      } else {
        alert("Login failed");
      }
    } else {
      alert("Please fill out the form correctly.");
    }
  }
}

export class Login {
  EmailId: string;
  Password: string;
  constructor() {
    this.EmailId = '';
    this.Password = '';
  }
}
