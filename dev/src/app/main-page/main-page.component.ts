import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../services/auth.service';
import { MainService } from '../services/main.service';
import { CreateGroupComponent } from './create-group/create-group.component';
import { EditGroupComponent } from './edit-group/edit-group.component';

export interface group {
  idgroup: number;
  name: string;
  start: string;
  end: string;
  groupssTypee: {
    groupssTypee: string;
    group: string;
  };
  description: string;
}
/*const h: group[] = [
  {
    idgroup: 1,
    name: 'sdgdsg',
    start: '2020/11/18',
    end: '2020/11/20',
    description: 'fdgfd',
    groupssTypee:'1'
  }]*/
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  //dataSource1 = new MatTableDataSource<group>(h);
  dataSource: any;
  displayedColumns: string[] = ['name', 'date', 'description','details'];
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
 // isLoading = true;
  groups: group[];
  [x: string]: any;

  constructor(public Auth: AuthService,
    private MainService: MainService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups(): void {
    this.MainService.getGroups().subscribe(results=>{
      this.isLoading = false;
      this.groups = results;
      this.dataSource = new MatTableDataSource(this.groups);
  }
    );
  }
  
  addGroups() : void {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      disableClose: true, 
      data: {
        name: this.name,
        start: this.start,
        end: this.end,
        groupssTypee: this.groupssTypee,
        description: this.description,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       this.MainService.addGroup(result.group).subscribe((result2) => {
       this.isLoading = false;
       this.groups.push(result2),
       this.dataSource = new MatTableDataSource(this.groups);
       console.log(this.groups);
       });
      }   console.log(result);
      
    });
  }

  changeGroup(item): void{
    const dialogRef = this.dialog.open(EditGroupComponent, {
      disableClose: true, 
      data: {
        item,
        name: this.name,
       // start: this.start,
       // end: this.end,
        description: this.description,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
     /* if (result) {
          this.MainService.updateGroup(result.group).subscribe(data => { 
          this.isLoading = false;
           const newvalue = data ? this.groups.findIndex(h => h.idgroup === data.idgroup) : -1;
          if (newvalue > -1) {
            this.groups[newvalue] = data;
          }
          this.dataSource = new MatTableDataSource(this.groups);
        });
    
     console.log('one', this.groups);
    }*/ 
    console.log(result);

    });
    
  }

  removeGroup(Group:group): void { 
   //this.dataSource = this.records.filter(h => h !== Record);
  /* this.isLoading = false;
   this.dataSource.data.splice(this.groups.indexOf(Group), 1);
   this.dataSource = new MatTableDataSource(this.dataSource.data);
   this.MainService.deleteGroup(Group).subscribe();
    console.log(this.groups);*/
  this.dataSource1.data.splice(this.groups.indexOf(Group), 1);
  this.dataSource1 = new MatTableDataSource(this.dataSource1.data);
  }

  onNoClick(): void {}

}
