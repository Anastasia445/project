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
import { users } from '../users.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  groups: users[];
  formGroups: FormGroup;
  dialogConfig: { disableClose: boolean; data: {} };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<EditUsersComponent>,
  private Auth: AuthService) { 
  }

  groupControl = new FormControl('', Validators.required);
  ngOnInit() {
    
    this.formGroups = new FormGroup({
      id:new FormControl(''),
      username: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      patronymic: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
    });
    if (this.data.item) {
      this.formGroups.get('username').setValue(this.data.item.username);
      this.formGroups.get('firstName').setValue(this.data.item.firstName);
      this.formGroups.get('lastName').setValue(this.data.item.lastName);
      this.formGroups.get('patronymic').setValue(this.data.item.patronymic);
     // this.formGroups.get('password').setValue(this.data.item.password);
      this.formGroups.get('email').setValue(this.data.item.email);
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
