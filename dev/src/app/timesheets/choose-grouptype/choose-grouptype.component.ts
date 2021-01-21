import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { Location } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TimesheetsComponent } from '../timesheets.component';
import { group } from 'src/app/main-page/main-page.component';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  durationInSeconds = 3;
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
    private _snackBar: MatSnackBar,
    private router: Router,
    private location: Location) { }

    id: string;
    roles: string;
  ngOnInit(): void {
    this.roles = this.getRole('roles');
    this.id = this.getId('id');
    if(this.roles ==='ROLE_MODERATOR'){
      this.getTimesheetsByGroupId();
    }else if(this.roles ==='ROLE_MODERATOR,ROLE_ADMIN' || this.roles ==='ROLE_ADMIN,ROLE_MODERATOR'){
      this.getGroupTypes();
    }
  }

  getId(number: string): string{
    return localStorage.getItem(number);
  }

  getRole(roles: string): string{
    return localStorage.getItem(roles);
  }

  openDialog() { 
    this._snackBar.openFromComponent(DialogMessageComponent, {
      duration: this.durationInSeconds * 700,
    });
  }

  getGroupTypes(){
    this.MainService.getGroupTypes()
    .subscribe(types => {this.groupType = types,
    this.isLoading = false})
  }

  onSelect(type){
    this.router.navigate(['/group', type.id])
  }

  record = [];
  groups2: group[];
  getTimesheetsByGroupId(): void {
    this.MainService.getGroupForEduc(this.id).subscribe(results=>{
      if(results == null){
        this.openDialog();
        this.router.navigate(['/main']);
      }else{
        this.record[0] = results;
        const id = this.record[0].id;
        this.router.navigate(['/timesheets', id]);
      }
    });  
  }

  onSelect2(group){
    this.router.navigate(['/table', this.route.snapshot.paramMap.get('id')])
  }
  

  goBack(): void {
    this.location.back();
  }

}


@Component({
  selector: 'dialog-message-component',
  templateUrl: 'dialog-message.component.html',
  styles: [`
    .example {
      color: hotpink;
    }
  `],
})
export class DialogMessageComponent {}
