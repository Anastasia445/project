import { Component, OnInit, Inject, NgModule } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
} from '@angular/forms'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorStateMatcher, MAY, SEP } from '@angular/material/core';
import { group } from '../main-page.component';




export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})

export class CreateGroupComponent implements OnInit {

  groups: group[];
  formGroups: FormGroup;
  dialogConfig: { disableClose: boolean; data: {} };
  matcher = new MyErrorStateMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<CreateGroupComponent>) { 
  }

  groupControl = new FormControl('', Validators.required);
  ngOnInit() {
    const today = new Date();
    const year = today.getFullYear();
    this.formGroups = new FormGroup({
      groupName: new FormControl(null, [Validators.required]),
      start: new FormControl(new Date(year, 8, 1,23,59)),
      end: new FormControl(new Date(year+1, 4, 31,23,59)),
      groupssTypee: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
    if (this.data.item) {
      this.formGroups.get('groupName').setValue(this.data.item.groupName);
      this.formGroups.get('groupssTypee').setValue(this.data.item.groupssTypee);
      this.formGroups.get('start').setValue(this.data.item.start);
      this.formGroups.get('end').setValue(this.data.item.end);
      this.formGroups.get('description').setValue(this.data.item.description);
    }
  }
  
public groupssTypee = [
    { groupssTypee: '1', group: 'Первая младшая' },
    { groupssTypee: '2', group: 'Вторая младшая' },
    { groupssTypee: '3', group: 'Средняя' },
    { groupssTypee: '4', group: 'Старшая' },
  ];
 
onlyOdds(d: Date): boolean {
  const date = d.getDate(); 
  const date1 = 1;
  return date % 1 == 1;
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
