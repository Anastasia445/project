import { tokenName } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../services/auth.service';
import { MainService } from '../services/main.service';
import { CreateGroupComponent } from './create-group/create-group.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { children } from '../children/children.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

export interface group {
  educatorId: number;
  id: number;
  groupName: string;
  start: Date;
  end: Date;
  groupType: {
    groupssTypee: string;
    group: string;
  };
  description: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  
  //dataSource1 = new MatTableDataSource<group>(h);
  durationInSeconds = 3;
  dataSource: any;
  displayedColumns: string[] = ['name', 'date', 'description','details'];
  displayedColumns2: string[] = ['name', 'date', 'description'];
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  isLoading = true;
  groups: group[];
  [x: string]: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(public Auth: AuthService,
    private MainService: MainService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute) {
    }

    id: string;
    roles: string;
  ngOnInit(): void {
    this.roles = this.getRole('roles');
    this.id = this.getId('id');
    this.getGroups();
  //  this.dataSource.paginator = this.paginator;
    console.log(this.id);
  }

  getId(number: string): string{
    return localStorage.getItem(number);
  }

  openDialog() { 
    this._snackBar.openFromComponent(DialogComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  record = [];
  groups2: group[];
  getGroups(): void {
    if(this.roles ==='ROLE_MODERATOR'){
      this.MainService.getGroupForEduc(this.id).subscribe(results=>{
        this.isLoading = false;
        if(results == null){
          this.groups2 = results;
          //this.record[0] = this.groups2;
          this.dataSource = new MatTableDataSource(this.record);
          this.dataSource.paginator = this.paginator;
         // console.log('educ',this.groups2);
        //  console.log('educ2',results);
        }else{
          this.groups2 = results;
          this.record[0] = results;
          this.dataSource = new MatTableDataSource(this.record);
          this.dataSource.paginator = this.paginator;
         // console.log('educl',this.record);
        }
  });
  }else if(this.roles ==='ROLE_MODERATOR,ROLE_ADMIN' || this.roles ==='ROLE_ADMIN,ROLE_MODERATOR'){
    this.MainService.getGroups().subscribe(results=>{
      this.isLoading = false;
      this.groups = results;
      this.dataSource = new MatTableDataSource(this.groups);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.groups);
  });
  }
  }
  rec = [];
  addGroups() : void {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      disableClose: true, 
      data: {
        educator: this.id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if(this.roles ==='ROLE_MODERATOR,ROLE_ADMIN' || this.roles ==='ROLE_ADMIN,ROLE_MODERATOR'){
          this.MainService.addGroup(result.group).subscribe((result2) => {
          this.isLoading = true;
          this.groups.push(result2);
          this.dataSource = new MatTableDataSource(this.groups);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.getGroups();
          });
        } else if(this.roles ==='ROLE_MODERATOR'){
          this.MainService.addGroup(result.group).subscribe((result2) => {
          this.isLoading = true;
         // this.rec[0].push(result2)
         this.groups2 = result2;
        //  this.record[0] = result2;
          this.record.push(result2);
          this.dataSource = new MatTableDataSource(this.record);
          /*this.groups.push(result2);
          this.dataSource = new MatTableDataSource(this.groups);*/
          this.dataSource.paginator = this.paginator;
          this.getGroups();
          });
        }
    }
  
  });
}

  changeGroup(item): void{
    const dialogRef = this.dialog.open(EditGroupComponent, {
      disableClose: true, 
      data: {
        item,
       // id: this.id,
        start: this.start,
        end: this.end,
       // groupName: this.groupName,
        description: this.description,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
          this.MainService.updateGroup(result.group).subscribe(data => { 
          this.isLoading = true;
           const newvalue = data ? this.groups.findIndex(h => h.id === data.id) : -1;
          if (newvalue > -1) {
            this.groups[newvalue] = data;
          }
          this.dataSource = new MatTableDataSource(this.groups);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.getGroups(); 
        });     
    }           
    });       
  }

  getRole(roles: string): string{
    return localStorage.getItem(roles);
  }
  
  records2: children[];
  removeGroup(Group:group): void { 
    const id = Group.id;
   this.MainService.getchildren(id).subscribe(results=>
    {
     // this.isLoading = true;
      this.records2 = results;
      if(this.records2.length > 0){
        this.openDialog();
      } else{
        //this.dataSource  = this.records.filter(h => h !== Record);
       /* this.dataSource.data.splice(this.groups.indexOf(Group), 1);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;*/
        this.MainService.deleteGroup(Group).subscribe(results=>
          {
            this.isLoading = true;
            this.dataSource.data.splice(this.groups.indexOf(Group), 1);
            this.dataSource = new MatTableDataSource(this.dataSource.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.getGroups();
          });
      }
    });
  }

  onNoClick(): void {}

}

@Component({
  selector: 'dialog-component',
  templateUrl: 'dialog-component.html',
  styles: [`
    .example {
      color: hotpink;
    }
  `],
})
export class DialogComponent {}