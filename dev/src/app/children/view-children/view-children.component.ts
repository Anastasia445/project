import { Component, Inject, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { children } from '../children.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

interface Grouptype {
  value: string;
}
interface Groupdiet {
  value: string;
  diet: boolean;
}
@Component({
  selector: 'app-view-children',
  templateUrl: './view-children.component.html',
  styleUrls: ['./view-children.component.css']
})
export class ViewChildrenComponent implements OnInit {

  records: children[];
  Record: children;
  diet={
    value:''
  }
  isReady:boolean;
  Edit: boolean;
  url="assets/profile.png";
  dialogConfig: { disableClose: boolean; data: {} };
  isReadyDiet: boolean;

  groupsFoodDiet: Grouptype[] = [
    {value:'Общий'},
    { value:'Диета'},
  ];

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

  groupsEducation: Grouptype[] = [
    {value: 'Высшее'},
    {value: 'Среднее специальное'},
    {value: 'Среднее общее'},
    {value: 'Среднее базовое'},
  ];

  groupsSiblings: Grouptype[] = [
    {value: 'Брат'},
    {value: 'Сестра'},
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewChildrenComponent>,
    private location: Location,
    private MainService: MainService,
    private route: ActivatedRoute) { }
   
    formGroups = new FormGroup({
    id:new FormControl(this.data.id),
    lastName:new FormControl(''),
    firstName:new FormControl(''),
    patronymic:new FormControl(''),
    dayOfBirth:new FormControl('', [Validators.required]),
    weightF:new FormControl('', [Validators.required]),
    heightF:new FormControl('', [Validators.required]),
    weightS:new FormControl('', [Validators.required]),
    heightS:new FormControl('', [Validators.required]),
    physGroup:new FormControl('', [Validators.required]),
    groupOfHealth:new FormControl(''),
    diet:new FormControl('', [Validators.required]),
    comment:new FormControl('',[Validators.required]),
    cityR:new FormControl('', [Validators.required]),
    streetR:new FormControl('', [Validators.required]),
    houseR:new FormControl('', [Validators.required]),
    flatR:new FormControl('', [Validators.required]),
    telephoneR:new FormControl('', [Validators.required]),
    cityL:new FormControl('', [Validators.required]),
    streetL:new FormControl('', [Validators.required]),
    houseL:new FormControl('', [Validators.required]),
    flatL:new FormControl('', [Validators.required]),
    telephoneL:new FormControl('', [Validators.required]),
    parents: new FormArray([
      new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        patronymic: new FormControl(''),
        education: new FormControl(''),
        telephone: new FormControl(''),
        placeOfWork: new FormControl(''),
        position: new FormControl('')
      }),
      new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        patronymic: new FormControl(''),
        education: new FormControl(''),
        telephone: new FormControl(''),
        placeOfWork: new FormControl(''),
        position: new FormControl('')
      })
    ]),
    brothersAndSisters: new FormArray([ ])
  });

  koll: any = 0;
  parents = this.formGroups.get('parents') as FormArray;
  brothersAndSisters = this.formGroups.get('brothersAndSisters') as FormArray;

  ngOnInit(): void {

    this.formGroups;
    if (this.data.item) {
      this.formGroups.get('lastName').setValue(this.data.item.lastName);
      this.formGroups.get('firstName').setValue(this.data.item.firstName);
      this.formGroups.get('patronymic').setValue(this.data.item.patronymic);
      this.formGroups.get('dayOfBirth').setValue(this.data.item.dayOfBirth);
      this.formGroups.get('weightF').setValue(this.data.item.weightF);
      this.formGroups.get('heightF').setValue(this.data.item.heightF);
      this.formGroups.get('weightS').setValue(this.data.item.weightS);
      this.formGroups.get('heightS').setValue(this.data.item.heightS);
      this.formGroups.get('groupOfHealth').setValue(this.data.item.groupOfHealth);
      this.formGroups.get('physGroup').setValue(this.data.item.physGroup);
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
      this.formGroups.get('parents').setValue(this.data.item.parents);
    } 
    this.getSistersAndBrothers();

  }

  getSistersAndBrothers(){
   /* console.log("f", this.formGroups.get('brothersAndSisters').value.length,
    this.formGroups.get('brothersAndSisters').value.count,
    this.data.item.brothersAndSisters.length);*/
    if(this.data.item.brothersAndSisters.length > this.koll){
      this.koll++;
      this.data.item.brothersAndSisters.forEach(el => {
      this.addSistersAndBrothers(el);
      });
    }
  }

  addSistersAndBrothers(value){
    const item = new FormGroup({
      firstName: new FormControl(value.firstName),
      lastName: new FormControl(value.lastName),
      patronymic: new FormControl(value.patronymic),
      education: new FormControl(value.education),
      placeOfWork: new FormControl(value.placeOfWork)   
    });
   this.brothersAndSisters.push(item);
  }  

  onSelectFile(file){
    if(file.target.files){
      let reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload=(event:any)=>{
      this.url=event.target.result;
      }
    }
  }

  foodDietInfo(){
    if(true)
    {
      this.isReadyDiet = true;
    } else
    {
      this.isReadyDiet = false;
    }
  }
   isClick: boolean;
    IsClick(){
      console.log("review",this.formGroups.get('diet').value);
    if(true)
    {
      this.isClick = true;
    } else
    {
      this.isClick = false;
    }
  }
  
  viewChild():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.MainService.getChildById(id)
      .subscribe(Records => {this.Record = Records;
        console.log('viewByID1',this.Record);
        console.log('viewByID2',Records);
      });
  }

  edit(){
    this.Edit = true;
  }

  kol: number=0;
  count(){
    this.kol++;
  }

  close(): void {
    this.location.back();
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
