import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FormGroupDirective, NgForm} from '@angular/forms'; 
import { ErrorStateMatcher, ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { AuthService } from 'src/app/services/auth.service';

interface signup {
  lastName:string, 
  firstName:string, 
  patronymic:string,
  email:string,
  username:string,
  password:number
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  
})
export class SignupComponent implements OnInit {

  isReady:boolean;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  records: signup[];
  
  signupUser = {
    username:'',
    email:'',
    firstName:'', 
    lastName:'', 
    patronymic: '',
    password: ''
  };
  lnameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Zа-яА-Я0-9-_ ]+$')
  ]);
  fnameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Zа-яА-Я0-9-_ ]+$')
  ]);
  patronymicFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Zа-яА-Я0-9-_ ]+$')
  ]);
  loginFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Zа-яА-Я0-9-_ ]+$')
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
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

  admin: boolean = false;
  checkAdmin(){
    this.admin = !this.admin;
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
      localStorage.setItem('roles', result.roles)
      this.showSuccess();
    }, error => this.showError()
    );
  }

  registerUser(){ 
      this.Auth.signupEducator(this.signupUser)
      .subscribe(result => {
        localStorage.setItem('token', result.token)
        localStorage.setItem('roles', result.roles)
        this.showSuccess();
      }, error => this.showError() 
      )
  }

}
