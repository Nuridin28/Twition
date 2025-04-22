import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../core/services/user.service';  // Import the UserService for backend interactions
import { AuthService } from '../../core/services/auth.service'; // Import AuthService for logout
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
})
export class UserProfileComponent implements OnInit {
  // Default avatar (since there's no upload avatar option during registration)
  defaultAvatar = '/assets/images/default.jpg';
  
  // Flag to toggle between view and edit modes
  isEditing = false;
  
  // Placeholder for user data fetched from backend
  user: any = {
    name: '',
    email: '',
    avatar: this.defaultAvatar
  };

  // Copy of user object to edit
  editedUser: any = { ...this.user };

  // Email validation flag (valid or invalid)
  isEmailValid = true;

  constructor(
    private location: Location, 
    private userService: UserService,  // Inject UserService
    private authService: AuthService  // Inject AuthService for logout functionality
  ) {}

  ngOnInit() {
    this.loadUserData();  // Load user data when the component is initialized
  }

  // Fetch user data after login/registration
  loadUserData() {
    const currentUser = this.authService.getCurrentUser(); // Get the current user object
    if (currentUser && currentUser.id) {
      this.userService.getUserProfile(currentUser.id).subscribe(
        (response) => {
          this.user = response;
          this.editedUser = { ...this.user }; // Initialize editedUser with fetched data
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('No user found');
    }
  }

  // This enables the edit mode and resets the data with flags
  enableEdit() {
    this.isEditing = true;
    this.editedUser = { ...this.user };
    this.isEmailValid = true;
  }

  // Save the changes (if only email is good)
  saveChanges() {
    if (this.validateEmail(this.editedUser.email)) {
      // Assuming an update to the backend here using UserService
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

  // Logout functionality (logout is not implemented yet)
  logout() {
    this.authService.logout();  // Assuming a logout method exists in AuthService
    console.log('User logged out');
  }

  // Validate email format using regex
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Avatar file changes and saves (reads the file as data URL, base64 image)
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

  // Go back to the previous page
  goBack() {
    this.location.back(); 
  }
}
