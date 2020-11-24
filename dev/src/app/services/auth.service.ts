import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

const register = '';
const login = '';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  signupUser(user) {
    return this.http.post<any>(register, user)  /*{  email: 'eve.holt@reqres.in',
    password: 'cityslicka'}*/
  }
  
  login(user){
    return this.http.post<any>(login, user)/*{ email: 'eve.holt@reqres.in',
    password: 'pistol'}*/
  }

  logoutUser(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  getToken() {
    return localStorage.getItem('token')
  }
  
  loggedIn(){
    return !!localStorage.getItem('token')    
  }
}
