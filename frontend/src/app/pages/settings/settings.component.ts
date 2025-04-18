import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
})
export class SettingsComponent implements OnInit {
  // Theme switching
  selectedTheme: 'dark' | 'light' = 'dark';
  darkMode = true;

  // Section switching
  selectedSection = 'account';

  // Password logic
  showPassword = false;
  showConfirmPassword = false;
  showOldPassword = false;
  newPassword: string = '';
  confirmPassword: string = '';
  oldPassword: string = '';
  passwordStrengthWarning: string = '';
  confirmPasswordWarning: string = '';

  // Language selection
  selectedLanguage = 'en';
  languages = [
    { code: 'en', label: 'English' },
    { code: 'kz', label: 'Kazakh' },
    { code: 'ru', label: 'Russian' },
  ];

  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    // Get saved theme on component load
    const savedTheme = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    this.setTheme(savedTheme);
  }

  // Section switch method
  selectSection(section: string) {
    this.selectedSection = section;
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Toggle confirm password visibility
  toggleConfirmVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Toggle old password visibility
  toggleOldVisibility() {
    this.showOldPassword = !this.showOldPassword;
  }

  // Check password strength
  checkPasswordStrength() {
    const password = this.newPassword;
    if (password.length < 8) {
      this.passwordStrengthWarning = 'Password should be at least 8 characters long';
    } else if (!/[A-Z]/.test(password)) {
      this.passwordStrengthWarning = 'Password should contain at least one uppercase letter';
    } else if (!/\d/.test(password)) {
      this.passwordStrengthWarning = 'Password should contain at least one number';
    } else {
      this.passwordStrengthWarning = '';
    }
  }

  // Check if the confirm password matches the new password
  checkConfirmPassword() {
    if (this.confirmPassword && this.confirmPassword !== this.newPassword) {
      this.confirmPasswordWarning = 'Passwords do not match!';
    } else {
      this.confirmPasswordWarning = '';
    }
  }

  // Save new password
  savePassword() {
    if (this.newPassword === this.confirmPassword) {
      console.log('Password updated.');
    } else {
      console.error('Passwords do not match!');
    }
  }

  // Set dark mode theme
  setDarkMode() {
    this.darkMode = true;
    this.setTheme('dark');
  }

  // Set light mode theme
  setLightMode() {
    this.darkMode = false;
    this.setTheme('light');
  }

  // Set theme and store it in localStorage
  setTheme(theme: 'dark' | 'light') {
    this.selectedTheme = theme;
    const body = document.body;

    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add(`theme-${theme}`);

    localStorage.setItem('theme', theme);
  }

  // Save selected language
  saveLanguage() {
    console.log('Selected language:', this.selectedLanguage);
  }
}
