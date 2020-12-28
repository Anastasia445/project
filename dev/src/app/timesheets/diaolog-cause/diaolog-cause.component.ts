import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { causes } from '../create-timesheets/create-timesheets.component';

@Component({
  selector: 'app-diaolog-cause',
  templateUrl: './diaolog-cause.component.html',
  styleUrls: ['./diaolog-cause.component.css']
})
export class DiaologCauseComponent implements OnInit {

  
  groups: causes[];
 // formGroups: FormGroup;
 checked: false;
  formGroups2: FormGroup;
  dialogConfig: { disableClose: boolean; data: {} };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<DiaologCauseComponent>
  ) { }
  
  formGroups = new FormGroup({
    id: new FormControl(this.data.id),
    causes: new FormArray([
      new FormGroup({
        cause: new FormControl(null, [Validators.required]),
        year: new FormControl(this.data.year),
        month: new FormControl(this.data.month),
        day: new FormControl(this.data.day),
        causeBol: new FormControl(this.data.causeBol)
      })
    ])
  });

  causes = this.formGroups.get('causes') as FormArray;

  ngOnInit() {

    this.formGroups;
    if (this.data.item) {
      this.formGroups.get('cause').setValue(this.data.item.cause);
      this.formGroups.get('year').setValue(this.data.item.year);
      this.formGroups.get('month').setValue(this.data.item.month);
      this.formGroups.get('day').setValue(this.data.item.day);
     // this.formGroups.get('id').setValue(this.data.item.id);
      this.formGroups.get('causeBol').setValue(this.data.item.causeBol);
    }
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
  close(){
    this.checked = false;
  }
   
  onSubmitGroups() {
    this.formGroups.getRawValue();
    this.dialogRef.close({
    group: this.formGroups.value,
    });
  }

}
