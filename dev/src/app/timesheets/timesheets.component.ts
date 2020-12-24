import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {MainService} from 'src/app/services/main.service';
import { DetailsComponent} from './details/details.component';
import { Location } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

export interface timesheet {
  name: string;
  id: number;
}

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.css']
})
export class TimesheetsComponent implements OnInit {

  timesheets: any;
  isLoading = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  records:any;
  groups: timesheet[];
  group: timesheet;
  newTimesheet = {
    name: '',
    id: this.route.snapshot.paramMap.get('id')
  }
  
  constructor(private MainService: MainService,
      private dialog: MatDialog,
      private route: ActivatedRoute,
      private router: Router,
      public dialogRef: MatDialogRef<TimesheetsComponent>,
      private location: Location) { }

  ngOnInit(): void {
    this.getTimesheetsByGroupId(this.route.snapshot.paramMap.get('id'))
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
       this.MainService.createTimesheet(result.group).subscribe()
       this.isLoading = true;
     //  this.groups.push(result2);
     //  });
      }  
      this.getTimesheetsByGroupId(this.route.snapshot.paramMap.get('id'));
    });
  }

  onSelect(group){
    this.router.navigate(['/table', this.route.snapshot.paramMap.get('id')])
  }
  
  goBack(): void {
    this.location.back();
  }
  /*addTimesheet(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.height = "50%";
    this.dialog.open(DetailsComponent, dialogConfig)
  }*/


}


