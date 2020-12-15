import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,  NgForm,FormGroupDirective, FormArray, FormBuilder } from '@angular/forms';
import { style } from '@angular/animations';
import { NgStyle } from '@angular/common';
import { MainService } from 'src/app/services/main.service';
import { children } from '../children.component';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';

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


interface Grouptype {
  value: string;
}
interface Groupdiet {
  value: string;
  diet: boolean;
}

@Component({
  selector: 'app-create-children',
  templateUrl: './create-children.component.html',
  styleUrls: ['./create-children.component.css']
})
export class CreateChildrenComponent implements OnInit {

  records: children[];
  record: children;
  matcher = new MyErrorStateMatcher();
  //profile: children;
  formGroups: FormGroup;
  parents: FormArray;
  bAndS: FormArray;
  dialogConfig: { disableClose: boolean; data: {} };
  displayedColumns: string[] = ['relatives'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateChildrenComponent>,
    private location: Location,
    private MainService: MainService) { }

   // brothersAndSisters = new FormArray([]);
  
    groupsFoodDiet: Groupdiet[] = [
      { diet:false, value:'Общий'},
      { diet:true, value:'Диета'},
    ];

  ngOnInit(): void {

    this.formGroups = new FormGroup({
      lastName:new FormControl(null, [Validators.required]),
      firstName:new FormControl(null, [Validators.required]),
      patronymic:new FormControl(null, [Validators.required]),
     // groups: new FormControl([24]),
      groups: new FormControl({id:this.groups[0]}, [Validators.required]),
      dayOfBirth:new FormControl(null, [Validators.required]),
      weightF:new FormControl(null, [Validators.required]),
      heightF:new FormControl(null, [Validators.required]),
      weightS:new FormControl(null, [Validators.required]),
      heightS:new FormControl(null, [Validators.required]),
      groupOfHealth:new FormControl(/*null, [Validators.required]*/),
  /* */    diet:new FormControl(null, [Validators.required]),
      comment:new FormControl(),
      cityR:new FormControl(null, [Validators.required]),
      streetR:new FormControl(null, [Validators.required]),
      houseR:new FormControl(null, [Validators.required]),
      flatR:new FormControl(null, [Validators.required]),
      telephoneR:new FormControl(null, [Validators.required]),
      cityL:new FormControl(null, [Validators.required]),
      streetL:new FormControl(null, [Validators.required]),
      houseL:new FormControl(null, [Validators.required]),
      flatL:new FormControl(null, [Validators.required]),
      telephoneL:new FormControl(null, [Validators.required]),
      brothersAndSisters: new FormArray([]),
      parents: new FormArray([])
     // brothersAndSisters: new FormArray([])
       
  });

    this.formGroups.get('brothersAndSisters') as FormArray;

    if (this.data.item) {
      this.formGroups.get('lastName').setValue(this.data.item.lastName);
      this.formGroups.get('firstName').setValue(this.data.item.firstName);
      this.formGroups.get('patronymic').setValue(this.data.item.patronymic);
   //   this.formGroups.get('groups').setValue(this.data.item.groups);
      this.formGroups.get('dayOfBirth').setValue(this.data.item.dayOfBirth);
      this.formGroups.get('weightF').setValue(this.data.item.weightF);
      this.formGroups.get('heightF').setValue(this.data.item.heightF);
      this.formGroups.get('weightS').setValue(this.data.item.weightS);
      this.formGroups.get('heightS').setValue(this.data.item.heightS);
      this.formGroups.get('groupOfHealth').setValue(this.data.item.groupOfHealth);
      this.formGroups.get('diet').setValue(this.data.item.diet);
      this.formGroups.get('comment').setValue(this.data.item.comment);
      this.formGroups.get('cityR').setValue(this.data.item.cityR);
      this.formGroups.get('streetR').setValue(this.data.item.streetR);
      this.formGroups.get('houseR').setValue(this.data.item.houseR);
      this.formGroups.get('flatR').setValue(this.data.item.flatR);
      this.formGroups.get('telephoneR').setValue(this.data.item.telephoneR);
      this.formGroups.get('cityL').setValue(this.data.item.cityL);
      this.formGroups.get('streetL').setValue(this.data.item.streetL);
      this.formGroups.get('houseL').setValue(this.data.item.houseL);
      this.formGroups.get('flatL').setValue(this.data.item.flatL);
      this.formGroups.get('telephoneL').setValue(this.data.item.telephoneL);
     
    /*  this.formGroups.brothersAndSisters.get('lastNameW').setValue(this.data.item.lastNameW);
this.formGroups.brothersAndSisters.get('firstNameW').setValue(this.data.item.firstNameW);
this.formGroups.brothersAndSisters.get('patronymicW').setValue(this.data.item.patronymicW);*/
    }

  }

    Create(){
      
      return new FormGroup({
      firstNameW: new FormControl(''),
      lastNameW: new FormControl(''),
      patronymicW: new FormControl('')
      //  educationW: new FormControl(''),
      //  whoIs: new FormControl('')
      })
    }

    addSaB() {
     // this.brothersAndSisters.push(this.Create());
      //   this.formGroups.brothersAndSisters.push(group);
    }

  removeSaB(index) {
    // this.contactList = this.form.get('contacts') as FormArray;
    this.bAndS.removeAt(index);
  }

  siblings = {
    groupSiblings:'groupsSiblings.value',
  }

    groups: Grouptype[] = [
      {value: 'первая младшая'},
      {value: 'вторая младшая'},
      {value: 'средняя'},
      {value: 'старшая'},
    ];

    groupsHealth: Grouptype[] = [
      {value: 'Первая'},
      {value: 'Вторая'},
      {value: 'Третья'},
      {value: 'Четвёртая'},
    ];
    
    groupsType: Grouptype[] = [
      {value: 'Основная'},
      {value: 'Подготовительная'},
      {value: 'СМГ'},
      {value: 'ЛФК'},
    ];

  /* groupsFoodDiet: Groupdiet[] = [
      {value: 'Общий', diet:false},
      {value: 'Диета', diet:true},
    ];*/

    groupsEducation: Grouptype[] = [
      {value: 'Высшее'},
      {value: 'Среднее спец/ое'},
      {value: 'Среднее общее'},
      {value: 'Среднее базовое'},
    ];

    groupsSiblings: Grouptype[] = [
      {value: 'Брат'},
      {value: 'Сестра'},
    ];

  isReady:boolean;
  url="assets/profile.png";

  onSelectFile(file){
    if(file.target.files){
      let reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload=(event:any)=>{
      this.url=event.target.result;
      }
    }
  }
 
  /*foodDietInfo(){
    if(this.profile.groupFoodDiet[1])
    {
      this.isReady = true;
    } else
    {
      this.isReady = false;
    }
  }*/

  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
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
