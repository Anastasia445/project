import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dev';
  constructor( public auth: AuthService){}

  roles: string;
  id: string;
  ngOnInit(): void {
    
    this.roles = this.getRole('roles');
    this.id = this.getId('id');
  }
  
  getId(number: string): string{
    return localStorage.getItem(number);
  }

  getRole(roles: string): string{
    return localStorage.getItem(roles);
  }
  
}
