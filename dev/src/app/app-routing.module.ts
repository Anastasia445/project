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
import { ViewChildrenComponent } from './children/view-children/view-children.component';
import { CreateTimesheetsComponent } from './timesheets/create-timesheets/create-timesheets.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { ChooseGrouptypeComponent } from './timesheets/choose-grouptype/choose-grouptype.component';
import { ChooseGroupComponent } from './timesheets/choose-group/choose-group.component';
import { TableAttendingComponent } from './timesheets/table-attending/table-attending.component';
import { PlansComponent } from './plans/plans.component';
import { CreatePlansComponent } from './plans/create-plans/create-plans.component';
import { EditPlansComponent } from './plans/edit-plans/edit-plans.component';
import { UsersComponent } from './users/users.component';
import { CreateUsersComponent } from './users/create-users/create-users.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'createGroup', component: CreateGroupComponent, canActivate: [AuthGuard]},
  { path: 'table/:id', component: CreateTimesheetsComponent, canActivate: [AuthGuard] },
  { path: 'groupType', component: ChooseGrouptypeComponent, canActivate: [AuthGuard] },
  { path: 'group/:id', component: ChooseGroupComponent, canActivate: [AuthGuard] },
  { path: 'timesheets/:id', component: TimesheetsComponent, canActivate: [AuthGuard] },
  { path: 'tableVisit/:id', component: TableAttendingComponent, canActivate: [AuthGuard] },
  { path: 'children/:id', component: ChildrenComponent, canActivate: [AuthGuard]},
  { path: 'addChild', component: CreateChildrenComponent, canActivate: [AuthGuard]},
  { path: 'viewChild/:id', component: ViewChildrenComponent, canActivate: [AuthGuard]},
  { path: 'plans', component: PlansComponent, canActivate: [AuthGuard] },
  { path: 'createPlan', component: CreatePlansComponent, canActivate: [AuthGuard] },
 // { path: 'viewPlan/:id', component: EditPlansComponent, canActivate: [AuthGuard] },
 { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
 { path: 'createUsers', component: CreateUsersComponent, canActivate: [AuthGuard] },
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
