import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './services/guards/guards.service';
import { PersonsComponent } from './pages/persons/persons.component';
import { RegistrationDataComponent } from './pages/registration-data/registration-data.component';
import { RegistrationContactComponent } from './pages/registration-contact/registration-contact.component';
import { RegistrationAddressComponent } from './pages/registration-address/registration-address.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: 'persons', component: PersonsComponent, canActivate: [AuthGuard] },

  { path: 'registration-data', component: RegistrationDataComponent, canActivate: [AuthGuard] },

  { path: 'registration-contact', component: RegistrationContactComponent, canActivate: [AuthGuard] },

  { path: 'registration-address', component: RegistrationAddressComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '' },

];
