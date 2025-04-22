import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../core/services/user.service';  
import { AuthService } from '../../core/services/auth.service'; 
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
})
export class UserProfileComponent implements OnInit {
  defaultAvatar = 'assets/images/default.jpg';
  isEditing = false;
  user: any = {
    name: '',
    email: '',
    avatar: this.defaultAvatar
  };
  editedUser: any = { ...this.user };
  isEmailValid = true;

  constructor(
    private location: Location, 
    private userService: UserService,  
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user && user.email) {
      this.user = {
        name: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email,
        avatar: user.avatar || this.defaultAvatar,
      };
      this.editedUser = { ...this.user };
    } else {
      this.loadUserData(); // ⬅️ Load from API
    }
  }
  
  loadUserData() {
    this.userService.getUserProfile().subscribe({
      next: (response: any) => {
        console.log('Fetched profile:', response);
  
        this.user = {
          name: `${response.firstName} ${response.lastName}`.trim(),
          email: response.email,
          avatar: response.avatar || this.defaultAvatar
        };
  
        this.editedUser = { ...this.user };
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
      }
    });
  }
  
  enableEdit() {
    this.isEditing = true;
    this.editedUser = { ...this.user };  
    this.isEmailValid = true;
  }

  saveChanges(): void {
    if (this.validateEmail(this.editedUser.email)) {
      const [firstName, ...rest] = this.editedUser.name.trim().split(' ');
      const lastName = rest.join(' ') || '';
  
      const updatedData = {
        first_name: firstName,
        last_name: lastName,
        avatar: this.editedUser.avatar,
      };
  
      this.userService.updateUserProfile(updatedData).subscribe({
        next: (response) => {
          this.user = {
            ...this.editedUser,
            name: `${firstName} ${lastName}`,
          };
  
          
          this.isEditing = false;
          this.isEmailValid = true;  
  
          console.log('User profile updated successfully');
        },
        error: (error) => {
          console.error('Error updating user profile:', error);
        }
      });
    } else {
      this.isEmailValid = false; 
    }
  }

  logout() {
    this.authService.logout();  
    this.router.navigate(['/auth/login']);
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onAvatarChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editedUser.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  goBack() {
    this.location.back();
  }
}
