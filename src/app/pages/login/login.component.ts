import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginObj: Login;
  constructor(private http: HttpClient, private router: Router) {
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
  onLogin() {
    let email: string = "geeth@karma.com";
    let password: string = "geeth@karma";

    if (this.loginObj.EmailId == email && this.loginObj.Password == password) {
      alert("Login Success");
      this.router.navigateByUrl('/sales-list')
    } else {
      alert("Login faild")
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
