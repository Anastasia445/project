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

export interface group {
  id: number;
  name: string;
  start: Date;
  end: Date;
  groupssTypee: {
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
  dataSource1 = new MatTableDataSource<group>(h);
  dataSource: any;
  displayedColumns: string[] = [/*'id',*/'name', 'date', 'description','details'];
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  isLoading = true;
  groups: group[];
  [x: string]: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(public Auth: AuthService,
    private MainService: MainService,
    public dialog: MatDialog) {
    }

  ngOnInit(): void {
    this.getGroups();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getGroups(): void {
    this.MainService.getGroups().subscribe(results=>{
      this.isLoading = false;
      this.groups = results;
      this.dataSource = new MatTableDataSource(this.groups);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }
    );
  }
  
  addGroups() : void {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      disableClose: true, 
      data: {
    /*    name: this.name,
        start: this.start,
        end: this.end,
        groupssTypee: this.groupssTypee,    
        description: this.description,*/
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       this.MainService.addGroup(result.group).subscribe((result2) => {
       this.isLoading = true;
       this.groups.push(result2);
       this.dataSource = new MatTableDataSource(this.groups);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       this.getGroups();
       });
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
        name: this.name,
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

  removeGroup(Group:group): void { 
   //this.dataSource = this.records.filter(h => h !== Record);
  this.isLoading = false;
   this.dataSource.data.splice(this.groups.indexOf(Group), 1);
   this.dataSource = new MatTableDataSource(this.dataSource.data);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
   this.MainService.deleteGroup(Group).subscribe();
  }

  onNoClick(): void {}

}
