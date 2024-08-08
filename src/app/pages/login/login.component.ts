import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
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
    private _coreService: CoreService,
    private _userServic: UserService
  ) {
    this.loginObj = new Login();
  }
  /*here code for login with backend API, but for now we will use hard coded email and password 
  onLogin() {
  this._userService.login(this.loginObj.email, this.loginObj.password).subscribe(
    (res: any) => {
      if (res.result) {
       this._coreService.openSnackBar('Login Success!', 'done');
        localStorage.setItem('karmaTestToken', res.data.token);
        this.router.navigateByUrl('/dashboard');
      } else {
        this._coreService.openSnackBar('Login failed!', 'done');
      }
    },
    (error) => {
      console.error("Login failed", error);
      alert("An error occurred during login. Please try again.");
    }
  );
}
  */  
 /* static email and pasword for login
  email = "geeth@karma.com";
  password = "geeth@karma";
*/
/**
 * Handles the login process.
 * 
 * Validates the login form, checks the entered email and password 
 * against predefined credentials, and provides feedback to the user. 
 * Redirects to the sales list page upon successful login.
 * 
 * @param {NgForm} loginForm - The login form with user input.
 */
  onLogin(loginForm: NgForm) {
    if (loginForm.valid) {
      const email = "geeth@karma.com";
      const password = "geeth@karma";

      if (this.loginObj.EmailId === email && this.loginObj.Password === password) {
        localStorage.setItem('karmaTestToken',"random-token");
        this._coreService.openSnackBar('Login Success!', 'done');
        this.router.navigateByUrl('/sales-list');
      } else {
        this._coreService.openSnackBar('Login failed!', 'done');
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
