import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component'; 
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SettingsComponent } from './pages/settings/settings.component'; 

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
<<<<<<< HEAD
    path: 'welcome',
=======
    path: 'welcome',  
>>>>>>> 8223bd182c44bbbb7af15dd45e473f961e63957b
    component: WelcomeComponent,
  },

  { path: '**', component: NotFoundComponent },
<<<<<<< HEAD
]
=======

]


>>>>>>> 8223bd182c44bbbb7af15dd45e473f961e63957b
