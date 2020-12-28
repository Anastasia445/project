import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { children } from 'src/app/children/children.component';



@Component({
  selector: 'app-diaolog-pay',
  templateUrl: './diaolog-pay.component.html',
  styleUrls: ['./diaolog-pay.component.css']
})
export class DiaologPayComponent implements OnInit {

   groups: children[];
// formGroups: FormGroup;
checked: false;
 formGroups2: FormGroup;
 dialogConfig: { disableClose: boolean; data: {} };
 constructor(
   @Inject(MAT_DIALOG_DATA) public data: any,
   public dialogRef: MatDialogRef<DiaologPayComponent>
 ) { }
 
 formGroups = new FormGroup({
   payed: new FormControl(true),
   id: new FormControl(this.data.id)
 });
 
 ngOnInit() {
   this.formGroups;
   if (this.data.item) {
    this.formGroups.get('payed').setValue(this.data.item.payed);
   }
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
