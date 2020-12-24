import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {MainService} from 'src/app/services/main.service';
import { timesheet } from '../timesheets.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  newTimesheet = {
    name: '',
    id:''
 //   id: this.route.snapshot.paramMap.get('id')
  }
  record: any;
  
  timesheet: timesheet;
  groups: timesheet[];
 // formGroups: FormGroup;
  dialogConfig: { disableClose: boolean; data: {} };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private MainService: MainService,
    public dialogRef: MatDialogRef<DetailsComponent>,
    private route: ActivatedRoute,
    private router: Router) { }

  formGroups = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    id: new FormControl(this.data.id),
  });

  ngOnInit(): void {
    this.formGroups;
    /*if (this.data.item) {
      this.formGroups.get('name').setValue(this.data.item.name);
  //    this.formGroups.get('id').setValue(this.data.item.id);
    }*/
  }

  onClose() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
   
  onSubmitGroups() {
    this.formGroups.getRawValue();
    this.dialogRef.close({
      group: this.formGroups.value,
    });
  }

}
