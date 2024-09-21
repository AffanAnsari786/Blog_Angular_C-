import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { Users } from '../shared/models/users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  errorMessage: boolean | null = null;
  userName: string = '';
  password: string = '';
  signUpUserName: string = '';
  signUpPassword: string = '';
  confirmPassword: string = ''; // Add confirm password field
  isLoading: boolean = false;
  isLogin: boolean = false;
  usersList!: Users[];
  protected _onDestroy = new Subject<void>();

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    localStorage.removeItem('UserID');
    localStorage.removeItem('UserName');
    this.router.navigate(['/login']);
  }

  onLogin(event: Event): void {
    event.preventDefault();
  
    this.apiService.login(this.userName, this.password).subscribe(
      (response) => {
        if (response && response.userId && response.userName) {
          localStorage.setItem('UserID', response.userId);
          localStorage.setItem('UserName', response.userName);
          this.router.navigate(['/feed']);
        } else {
          this.errorMessage = true;
        }
      },
      (error) => {
        if (error.status === 401) {
          console.log('Incorrect password!');
        } else if (error.status === 404) {
          console.log('User not found!');
        } else {
          console.log('An error occurred during login!');
        }
      }
    );
  }

  onSignup(event: Event): void {
    event.preventDefault(); // Prevent form from auto-submitting
    
    if (this.signUpPassword !== this.confirmPassword) {
      console.log('Passwords do not match!');
      return;
    }
  
    this.apiService.register(this.signUpUserName, this.signUpPassword).subscribe(
      (response) => {
        console.log('Register successful!');
        this.isLogin = true
      },
      (error) => {
        console.log('Registration failed!', error);
      }
    );
  }

  changeLogin(): void {
    this.isLogin = !this.isLogin;
  }
}
