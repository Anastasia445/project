import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { Location } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TimesheetsComponent } from '../timesheets.component';
import { DetailsComponent } from '../details/details.component';

export interface timesheet {
  name: string;
  id: number;
}
@Component({
  selector: 'app-choose-grouptype',
  templateUrl: './choose-grouptype.component.html',
  styleUrls: ['./choose-grouptype.component.css']
})
export class ChooseGrouptypeComponent implements OnInit {

  timesheets: any;
  records:any;
  groups: timesheet[];
  group: timesheet;
  [x: string]: any;

  groupType:any;
  isLoading = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  type=[
    {id: 1, name: "Первая младшая"},
    {id: 2, name: "Вторая младшая"},
    {id: 3, name: "Средняя"},
    {id: 4, name: "Старшая"}
  ];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<TimesheetsComponent>,
    private MainService: MainService,
    private router: Router,
    private location: Location) { }

    id: string;
    roles: string;
  ngOnInit(): void {
    this.roles = this.getRole('roles');
    this.id = this.getId('id');
    //if(this.roles ==='ROLE_MODERATOR'){
   // this.getTimesheetsByGroupId(this.route.snapshot.paramMap.get('id'))
  //}else if(this.roles ==='ROLE_MODERATOR,ROLE_ADMIN' || this.roles ==='ROLE_ADMIN,ROLE_MODERATOR'){
    this.getGroupTypes();
 // }
  }

  getId(number: string): string{
    return localStorage.getItem(number);
  }

  getRole(roles: string): string{
    return localStorage.getItem(roles);
  }

  getGroupTypes(){
    this.MainService.getGroupTypes()
    .subscribe(types => {this.groupType = types,
    this.isLoading = false;})
  }

  onSelect(type){
    this.router.navigate(['/group', type.id])
  }

  getTimesheetsByGroupId(id){
    this.MainService.getTimesheetsForGroup(id)
    .subscribe(result => {
      this.isLoading = false;
      this.timesheets = result;
      console.log(this.timesheets);
    })
  }

  addTimesheets() : void {
    const dialogRef = this.dialog.open(DetailsComponent, {
      disableClose: true, 
      data: {
        id: +this.route.snapshot.paramMap.get('id')    
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       this.MainService.createTimesheet(result.group).subscribe((data)=>{
       this.isLoading = true,
       this.timesheets.push(data),
     this.getTimesheetsByGroupId(this.route.snapshot.paramMap.get('id'))
       })
      }  
    });
  }

  changeTimesheet(item): void{
    const dialogRef = this.dialog.open(DetailsComponent, {
      disableClose: true, 
      data: {
        item,
        id: this.id
      },
    });
    console.log('one1', this.groups);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
          this.MainService.updateTimesheet(result.group).subscribe((data) => { 
          this.isLoading = true;
            this.groups = data;
          this.getTimesheetsByGroupId(this.route.snapshot.paramMap.get('id'));
        });     
    }           
    });      
  }

  deleteTimesheet(){
    this.MainService.deleteTimesheet(this.timesheets[0].id).subscribe((t)=>{
      this.isLoading = true,
      this.getTimesheetsByGroupId(this.route.snapshot.paramMap.get('id'))
    });
  }

  onSelect2(group){
    this.router.navigate(['/table', this.route.snapshot.paramMap.get('id')])
  }
  

  goBack(): void {
    this.location.back();
  }

}
