import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '0.5s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-20px)', opacity: 0 }),
        animate(
          '0.4s ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('staggeredFade', [
      transition(':enter', [
        query(
          '.form-element',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(100, [
              animate(
                '0.5s ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;
  currentStep = 1;
  totalSteps = 2;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public translateService: TranslateService,
    public themeService: ThemeService
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordStrengthValidator,
          ],
        ],
        confirmPassword: ['', Validators.required],
        agreeTerms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    setTimeout(() => {
      const formElements = document.querySelectorAll('.form-element');
      formElements.forEach((el, index) => {
        setTimeout(() => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'translateY(0)';
        }, index * 100);
      });
    }, 300);
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

    const passwordValid =
      hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

    return !passwordValid ? { passwordStrength: true } : null;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { firstName, lastName, email, password } = this.registerForm.value;

      this.authService
        .register(firstName, lastName, email, password)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['auth/login']);
            alert('successful registration');
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage =
              error.message || 'Registration failed. Please try again.';
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      if (this.currentStep === 1) {
        const step1Controls = ['firstName', 'lastName', 'email'];
        const isStep1Valid = step1Controls.every(
          (controlName) => this.registerForm.get(controlName)?.valid
        );

        if (!isStep1Valid) {
          step1Controls.forEach((controlName) =>
            this.registerForm.get(controlName)?.markAsTouched()
          );
          return;
        }
      }

      this.currentStep++;

      setTimeout(() => {
        const formElements = document.querySelectorAll('.form-element');
        formElements.forEach((el, index) => {
          setTimeout(() => {
            (el as HTMLElement).style.opacity = '1';
            (el as HTMLElement).style.transform = 'translateY(0)';
          }, index * 100);
        });
      }, 100);
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  switchLanguage(language: string): void {
    this.translateService.use(language);
    localStorage.setItem('preferredLanguage', language);
  }

  switchTheme(theme: 'light' | 'dark' | 'device'): void {
    this.themeService.setTheme(theme);
  }

  navigateToLogin(): void {
    this.router.navigate(['auth/login']);
  }

  getPasswordStrength(): { strength: number; text: string; class: string } {
    const password = this.registerForm.get('password')?.value;

    if (!password) {
      return {
        strength: 0,
        text: 'REGISTER.PASSWORD_STRENGTH.NONE',
        class: 'strength-none',
      };
    }

    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]+/.test(password)) strength++;
    if (/[a-z]+/.test(password)) strength++;
    if (/[0-9]+/.test(password)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) strength++;

    const strengthMap = [
      {
        text: 'REGISTER.PASSWORD_STRENGTH.VERY_WEAK',
        class: 'strength-very-weak',
      },
      { text: 'REGISTER.PASSWORD_STRENGTH.WEAK', class: 'strength-weak' },
      { text: 'REGISTER.PASSWORD_STRENGTH.MEDIUM', class: 'strength-medium' },
      { text: 'REGISTER.PASSWORD_STRENGTH.STRONG', class: 'strength-strong' },
      {
        text: 'REGISTER.PASSWORD_STRENGTH.VERY_STRONG',
        class: 'strength-very-strong',
      },
    ];

    return {
      strength,
      text:
        strengthMap[strength - 1]?.text || 'REGISTER.PASSWORD_STRENGTH.NONE',
      class: strengthMap[strength - 1]?.class || 'strength-none',
    };
  }
}
