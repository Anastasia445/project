import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { SendEmailComponent } from './account/send-email/send-email.component';
import { AuthGuard } from './auth.guard';
import { MainPageComponent } from './main-page/main-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'login', component: LoginComponent },
  { path: 'sendEmail', component: SendEmailComponent},
  { path: 'signup', component: SignupComponent },
  { path: "**",redirectTo:"/main"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
