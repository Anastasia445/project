import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth.guard';
import { InterceptorService } from './services/interceptor.service';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendEmailComponent } from './account/send-email/send-email.component';
import { CreateGroupComponent } from './main-page/create-group/create-group.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { EditGroupComponent } from './main-page/edit-group/edit-group.component';
import { ChildrenComponent } from './children/children.component';
import { CreateChildrenComponent } from './children/create-children/create-children.component';
import { EditChildrenComponent } from './children/edit-children/edit-children.component';
import { ViewChildrenComponent } from './children/view-children/view-children.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { CreateTimesheetsComponent } from './timesheets/create-timesheets/create-timesheets.component';
import { ChooseGrouptypeComponent } from './timesheets/choose-grouptype/choose-grouptype.component';
import { DetailsComponent } from './timesheets/details/details.component';
import { ChooseGroupComponent } from './timesheets/choose-group/choose-group.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MainPageComponent,
    SendEmailComponent,
    CreateGroupComponent,
    EditGroupComponent,
    ChildrenComponent,
    CreateChildrenComponent,
    EditChildrenComponent,
    ViewChildrenComponent,
    TimesheetsComponent,
    CreateTimesheetsComponent,
    ChooseGrouptypeComponent,
    DetailsComponent,
    ChooseGroupComponent
  ],
  entryComponents: [CreateGroupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,
      ReactiveFormsModule.withConfig({
        warnOnNgModelWithFormControl: 'never'
      })
  ],
  providers: [AuthGuard,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide : HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
