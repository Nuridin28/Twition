import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../core/services/user.service';  
import { AuthService } from '../../core/services/auth.service'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
})
export class UserProfileComponent implements OnInit {
  defaultAvatar = '/assets/images/default.jpg';
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
    private authService: AuthService  
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const currentUser = this.authService.getCurrentUser(); 
    if (currentUser && currentUser.id) {
      this.userService.getUserProfile().subscribe(
        (response) => {
          this.user = response;
          this.editedUser = { ...this.user };
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('No user found');
    }
  }

  enableEdit() {
    this.isEditing = true;
    this.editedUser = { ...this.user };  
    this.isEmailValid = true;
  }

  saveChanges() {
    if (this.validateEmail(this.editedUser.email)) {
      this.userService.updateUserProfile(this.editedUser).subscribe(
        (response) => {
          this.user = { ...this.editedUser };
          this.isEditing = false;
        },
        (error) => {
          console.error('Error updating user profile:', error);
        }
      );
    } else {
      this.isEmailValid = false;
    }
  }

  logout() {
    this.authService.logout();  
    console.log('User logged out');
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
