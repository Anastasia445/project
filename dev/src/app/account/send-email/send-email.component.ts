import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorStateMatcher, ThemePalette } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  isLoading = true;
loginUser = {
  email:''}
  isLoadingResults = true;
  isReady:boolean;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  
  matcher = new MyErrorStateMatcher();
constructor( private Auth: AuthService, private router: Router, 
  private toastr: ToastrService, private location: Location) {

  setTimeout(()=> {
    this.isReady = true;}, 600);
  }

ngOnInit(): void {}

goBack(): void {
  this.location.back();
}

send(){}

}
