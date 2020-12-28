import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorStateMatcher, ThemePalette } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  isLoading = true;

  loginUser = {
    username:'', 
    password:''
  }

    isLoadingResults = true;
    isReady:boolean;
    color: ThemePalette = 'primary';
    mode: ProgressSpinnerMode = 'indeterminate';

    loginFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Zа-яА-Я0-9-_ ]+$')
    ]);
    passwordFormControl = new FormControl('', [
      Validators.required
    ]);

    matcher = new MyErrorStateMatcher();

  constructor( private Auth: AuthService, private router: Router, private toastr: ToastrService) {
    setTimeout(()=> {
      this.isReady = true;}, 600);
    }

  ngOnInit(): void {
    
  }
  showSuccess() {
    this.router.navigate(['/main'])
  }

  showError(){
    this.toastr.error('Введён неверный пароль и/или логин');
    this.router.navigate(['/login'])
  }

  login(){
    this.Auth.login(this.loginUser)
    .subscribe(result => 
      { 
        localStorage.setItem('token', result.token)
        localStorage.setItem('roles', result.roles)
        this.showSuccess();
    }, error => this.showError()
    );
  }
  
}
