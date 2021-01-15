import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

const register = '/api/auth/register';
const registerUser = '/api/educator/register';
const login = '/api/auth/login';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  roleAs: string;
  
  signupUser(user) {
    return this.http.post<any>(register, user) 
  }

  signupEducator(user) {
    return this.http.post<any>(registerUser, user) 
  }
  
  login(user){
    return this.http.post<any>(login, user)
  }
  

  logoutUser(){
    localStorage.removeItem('roles')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    this.router.navigate(['/login'])
  }

  getToken() {
    return localStorage.getItem('token') 
  }
  
  loggedIn(){
    return !!localStorage.getItem('token') && !!localStorage.getItem('roles') && !!localStorage.getItem('id')
  }
  getRole() {
    this.roleAs = localStorage.getItem('roles');
    return this.roleAs;
  }

}
