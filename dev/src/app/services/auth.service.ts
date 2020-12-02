import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

const register = '/api/auth/register';
const login = '/api/auth/login';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  signupUser(user) {
    return this.http.post<any>(register, user) 
  }
  
  login(user){
    return this.http.post<any>(login, user)
  }
  

  logoutUser(){
    localStorage.removeItem('roles')
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  getToken() {
    return localStorage.getItem('token') && localStorage.getItem('roles')
  }
  
  loggedIn(){
    return !!localStorage.getItem('token')    && !!localStorage.getItem('roles')
  }


}
