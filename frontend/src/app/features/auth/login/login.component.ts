import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../ui/input/input.component';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, InputComponent, LucideAngularModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  hidePassword: boolean = true;
  eyeIcon = Eye;

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
    this.eyeIcon = this.hidePassword ? Eye : EyeOff;
  }

  validateUsername() {
    const usernamePattern = /^[a-zA-Z0-9._-]{3,}$/;
    return usernamePattern.test(this.username);
  }

  validatePassword() {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordPattern.test(this.password);
  }

  isFormValid() {
    return this.validateUsername() && this.validatePassword();
  }

  navigateToRegister() {
    alert('Redirecting to registration page...');
    this.router.navigate(['/auth/register']);
  }

  onSubmit() {
    if (!this.isFormValid()) {
      alert('Please enter valid credentials.');
      return;
    }
    console.log('Login Data:', {
      username: this.username,
      password: this.password,
    });
  }
}
