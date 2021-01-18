import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../services/auth.service';
import { MainService } from '../services/main.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateUsersComponent } from './create-users/create-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';

export interface users {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  patronymic: string,
 // dayOfBirth: string,
 // roles: string,
  password: string,
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  allusers: users[];
 // allusers: any;
  dataSource: any;
  displayedColumns: string[] = ['fio','username','mail', 'details'];
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  isLoading = true;
  allplans: any;
  [x: string]: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
 // @ViewChild(MatSort) sort: MatSort;
  getMonth: boolean;
  isShow: boolean = true;

  constructor(public Auth: AuthService,
    private MainService: MainService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) {
    }

    roles: string;
    id: string;
    ngOnInit(): void {
      this.roles = this.getRole('roles');
      this.id = this.getId('id');
      this.getusers();
    }
    
    getId(number: string): string{
      return localStorage.getItem(number);
    }
  
    getRole(roles: string): string{
      return localStorage.getItem(roles);
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    getusers(): void {
    /*  if(this.roles ==='ROLE_MODERATOR'){
        this.MainService.getPlanByEducatorId(this.id).subscribe(results=>{
          this.isLoading = false;
         // this.allplanss = results;
          this.dataSource = new MatTableDataSource(this.allplanss);
          this.dataSource.paginator = this.paginator;
          console.log('mod',this.allplanss);
        });
      } else*/ if(this.roles ==='ROLE_MODERATOR,ROLE_ADMIN' || this.roles ==='ROLE_ADMIN,ROLE_MODERATOR'){
          this.MainService.getAllUsers().subscribe(results=>{
            this.isLoading = false;
            this.allusers = results;
            this.dataSource = new MatTableDataSource(this.allusers);
            this.dataSource.paginator = this.paginator;
            console.log('users',this.allusers);
          });
      }
    }

    records: users[];
    changeUser(item){
    const dialogRef = this.dialog.open(EditUsersComponent, {
      disableClose: true, 
      data: {
        item
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
          this.MainService.updateUser(result.group).subscribe(data => { 
          this.isLoading = true;
           const newvalue = data ? this.records.findIndex(h => h.id === data.id) : -1;
          if (newvalue > -1) {
            this.records[newvalue] = data;
          }
          this.dataSource = new MatTableDataSource(this.records);
          this.dataSource.paginator = this.paginator;
          this.getPlan(); 
        });     
    }           
    });      
  }

  
    removeUser(user:users){
      this.MainService.deleteUser(user).subscribe((t)=>{
        this.isLoading = true,
        this.dataSource.data.splice(this.allusers.indexOf(user), 1);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.getusers();
      });;
    }

}
