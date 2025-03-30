import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule],
})
export class RegisterComponent {
  fullname: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  get passwordMismatch(): boolean {
    return (
      this.password !== this.confirmPassword && this.confirmPassword.length > 0
    );
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onSubmit() {
    if (!this.passwordMismatch) {
      console.log('Registration Data:', {
        fullname: this.fullname,
        username: this.username,
        password: this.password,
      });
    }
  }
}
