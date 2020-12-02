import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { SendEmailComponent } from './account/send-email/send-email.component';
import { AuthGuard } from './auth.guard';
import { MainPageComponent } from './main-page/main-page.component';
import { CreateGroupComponent } from './main-page/create-group/create-group.component';
import { ChildrenComponent } from './children/children.component';
import { CreateChildrenComponent } from './children/create-children/create-children.component';
import { EditChildrenComponent } from './children/edit-children/edit-children.component';
import { ViewChildrenComponent } from './children/view-children/view-children.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'createGroup', component: CreateGroupComponent, canActivate: [AuthGuard] },
  { path: 'children', component: ChildrenComponent, canActivate: [AuthGuard]},
  { path: 'addChild/:id', component: CreateChildrenComponent, canActivate: [AuthGuard]},
  { path: 'editChild', component: EditChildrenComponent, canActivate: [AuthGuard]},
  { path: 'viewChild/:id', component: ViewChildrenComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'sendEmail', component: SendEmailComponent},
  { path: 'signup', component: SignupComponent },
  { path: "**",redirectTo:"/login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }