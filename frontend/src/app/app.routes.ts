import { Routes } from '@angular/router';
import {LoginComponent} from '../features/auth/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', component: NotFoundComponent},
];
