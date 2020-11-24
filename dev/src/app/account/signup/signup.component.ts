import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FormGroupDirective, NgForm} from '@angular/forms'; 
import { ErrorStateMatcher, ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { AuthService } from 'src/app/services/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isReady:boolean;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  signupUser = {
    lname:'', 
    fname:'', 
    patronymic: '',
    email:'',
    login:'',
    password: ''
  };
  lnameFormControl = new FormControl('', [
    Validators.required
  ]);
  fnameFormControl = new FormControl('', [
    Validators.required
  ]);
  patronymicFormControl = new FormControl('', [
    Validators.required
  ]);
  loginFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  //formSignUp: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  constructor(private toastr: ToastrService,
    private router: Router,
    private Auth: AuthService) {
      setTimeout(()=> {
        this.isReady = true;}, 600);
     }
  public data: any
  ngOnInit(): void {
  }

  showSuccess() {
    this.router.navigate(['/login']);
  }

  showError(){
    this.toastr.error('Введены невеные данные');
    this.router.navigate(['/signup'])
  }

  register() {
    this.Auth.signupUser(this.signupUser)
    .subscribe(result => {
      localStorage.setItem('token', result.token)
      this.showSuccess();
    }, error => this.showError()
    );
  }

}
