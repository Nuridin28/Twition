import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [CommonModule, FormsModule],
})
export class UserProfileComponent {
  constructor(private location: Location) {}
  // it is default avatar(because in register there is no upload avatar option)
  defaultAvatar = '/assets/images/default.jpg';
  // flag to toggle between view and edit modes
  isEditing = false;
  
  // mock data stored in user object(temporary)
  user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: this.defaultAvatar
  };
  // copy of user object to edit
  editedUser = { ...this.user };
  //email validation flag(good email or bad email)
  isEmailValid = true;

  //this one enables the edit mode and resets the data with flags
  enableEdit() {
    this.isEditing = true;
    this.editedUser = { ...this.user };
    this.isEmailValid = true;
  }

  //save the changes(if only email is good)
  saveChanges() {
    if (this.validateEmail(this.editedUser.email)) {
      this.user = { ...this.editedUser };
      this.isEditing = false;
    } else {
      this.isEmailValid = false;
    }
  }

  //logout is not made yet
  logout() {
    console.log('User logged out');
  }


  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  //avatar file changes and saves(reads the file as data url base 64 image)
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
