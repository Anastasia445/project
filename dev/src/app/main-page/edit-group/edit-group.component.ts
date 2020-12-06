import { Component, OnInit, Inject, NgModule } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
} from '@angular/forms'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { group } from '../main-page.component';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  groups: group[];
  formGroups: FormGroup;
  dialogConfig: { disableClose: boolean; data: {} };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<EditGroupComponent>
  ) { }
  groupControl = new FormControl('', Validators.required);

  ngOnInit() {
    this.formGroups = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(null, [Validators.required]),
      localDate: new FormControl(''),
    //  end: new FormControl(new Date(year+1, 5, 31)),
      groupssTypee: new FormControl(''),
      description: new FormControl(null, [Validators.required]),
    });
    if (this.data.item) {
      this.formGroups.get('name').setValue(this.data.item.name);
     this.formGroups.get('groupssTypee').setValue(this.data.item.groupssTypee.id);
      this.formGroups.get('localDate').setValue(this.data.item.localDate);
      this.formGroups.get('id').setValue(this.data.item.id);
      this.formGroups.get('description').setValue(this.data.item.description);
    }
    
    /*
    this.formGroups = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
    if (this.data.item) {
      this.formGroups.get('name').setValue(this.data.item.name);
      this.formGroups.get('description').setValue(this.data.item.description);
    }*/
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

