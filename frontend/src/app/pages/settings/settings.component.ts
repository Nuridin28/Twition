import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { UserService } from '../../core/services/user.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, TranslateModule],
})
export class SettingsComponent implements OnInit {

  selectedTheme: 'dark' | 'light' = 'dark';
  darkMode = true;


  selectedSection = 'account';


  showPassword = false;
  showConfirmPassword = false;
  showOldPassword = false;
  newPassword = '';
  confirmPassword = '';
  oldPassword = '';
  passwordStrengthWarning = '';
  confirmPasswordWarning = '';


  selectedLanguage = 'en';
  languages = [
    { code: 'en', label: 'English' },
    { code: 'kk', label: 'Kazakh' },
    { code: 'ru', label: 'Russian' },
  ];

  constructor(
    public themeService: ThemeService,
    public translateService: TranslateService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const savedTheme = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    this.setTheme(savedTheme);

    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    this.selectedLanguage = savedLang;
    this.translateService.use(savedLang);
  }


  
  selectSection(section: string): void {
    this.selectedSection = section;
  }
  


  switchLanguage(language: string): void {
    this.selectedLanguage = language;
    this.translateService.use(language);
    localStorage.setItem('preferredLanguage', language);
  }


  setTheme(theme: 'dark' | 'light'): void {
    this.selectedTheme = theme;
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
  }


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  toggleOldVisibility(): void {
    this.showOldPassword = !this.showOldPassword;
  }


  checkPasswordStrength(): void {
    const pw = this.newPassword;

    if (!pw) {
      this.passwordStrengthWarning = '';
      return;
    }

    if (pw.length < 8) {
      this.passwordStrengthWarning = 'SETTINGS.PASSWORD_WARNING.LENGTH';
    } else if (!/[A-Z]/.test(pw)) {
      this.passwordStrengthWarning = 'SETTINGS.PASSWORD_WARNING.UPPERCASE';
    } else if (!/[a-z]/.test(pw)) {
      this.passwordStrengthWarning = 'SETTINGS.PASSWORD_WARNING.LOWERCASE';
    } else if (!/[0-9]/.test(pw)) {
      this.passwordStrengthWarning = 'SETTINGS.PASSWORD_WARNING.NUMBER';
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw)) {
      this.passwordStrengthWarning = 'SETTINGS.PASSWORD_WARNING.SPECIAL';
    } else {
      this.passwordStrengthWarning = '';
    }
  }


  checkConfirmPassword(): void {
    if (this.newPassword && this.confirmPassword && this.newPassword !== this.confirmPassword) {
      this.confirmPasswordWarning = 'SETTINGS.PASSWORD_WARNING.MISMATCH';
    } else {
      this.confirmPasswordWarning = '';
    }
  }

  savePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      console.error('Passwords do not match!');
      this.confirmPasswordWarning = 'Passwords do not match!';
      return;
    }

    console.log('Password updated.');
    alert('Password changed successfully!');
    this.newPassword = '';
    this.confirmPassword = '';
    this.oldPassword = '';
  }
}
