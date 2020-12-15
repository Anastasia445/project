import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MainService } from '../services/main.service';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { CreateChildrenComponent } from './create-children/create-children.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewChildrenComponent } from './view-children/view-children.component';


export interface children {
  id: number;
 // photo: string;
  lastName: string;
  firstName: string
  patronymic: string;
  group: [{
   id:number;
   groupssTypee:{
     name:string;
     }
  }];
  parents:[{
      firstName:string;
      lastName:string;
      patronymic:string;
      education:string;
      placeOfWork: string;
      position: string;
      telephone: string;
  }];
  comment:string;
  causes:[
  {
      date:string;
      cause:string;
      causeBol:boolean;
  }];
  dayOfBirth: string;
  weightF: string;
  heightF: string;
  weightS: string;
  heightS: string;
  groupOfHealth: string;
  diet: boolean;
  cityR: string;
  streetR: string;
  houseR: string;
  flatR: string;
  telephoneR: string;
  cityL: string;
  streetL: string;
  houseL: string;
  flatL: string;
  telephoneL: string;
  whoIs: string;
  firstNameW: string;
  lastNameW: string;
  patronymicW: string;
}

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {

  [x: string]: any;
  displayedColumns: string[] = [
    'lname',
    'fname',
    'patronymic',
    'dateBorn'
  ];

  length:number;
  dataSource: any;
  records: children[];
  isReady:boolean;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  isLoading = true;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private MainService: MainService,
    private route: ActivatedRoute,
    public Auth: AuthService,
    private location: Location,
    public dialog: MatDialog) 
    {    }

  ngOnInit() {
   this.getchildren();
   
  }

  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

  addChild(): void{
  const dialogRef = this.dialog.open(CreateChildrenComponent, {
    disableClose: true, 
    data: { 
    },
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
     this.MainService.addChild(result.group).subscribe((result2) => {
     this.isLoading = true;
     this.records.push(result2);
     this.dataSource = new MatTableDataSource(this.records);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
     console.log(this.records);
     console.log('2',result);
     this.getchildren();
     });
    }   console.log();
    
  });
  }

  changeChild(item): void{
    const dialogRef = this.dialog.open(ViewChildrenComponent, {
      disableClose: true, 
      data: {
        item,
     //   id: this.id,
        
        
      },
    });
    console.log('one1', this.records);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
          this.MainService.updateChild(result.group).subscribe(data => { 
          this.isLoading = true;
           const newvalue = data ? this.records.findIndex(h => h.id === data.id) : -1;
          if (newvalue > -1) {
            this.records[newvalue] = data;
          }
          this.dataSource = new MatTableDataSource(this.records);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.getchildren(); 
        });     
    }           
    });      
  }

  getchildren(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.MainService.getchildren(id).subscribe(results=>
    {
      this.isLoading = false;
      this.records = results;
      this.dataSource = new MatTableDataSource(this.records);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.records);
    });
  }

  onNoClick(): void {}

  goBack(): void {
    this.location.back();
  }

}
