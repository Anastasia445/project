import { Component, Inject, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { children } from '../children.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  r ={
   // photo: '',
    lastName: '',
    firstName: '',
    patronymic: '',
    dayOfBirth:'',
    id: +this.route.snapshot.paramMap.get('id'),
parents:[{
    firstName:'',
    lastName:'',
    patronymic:'',
    education:'',
    placeOfWork: '',
    position: '',
    telephone:'',
}],
comment:'',
causes:[
{
    date:'',
    cause:'',
    causeBol:'',
}],

weightF: '',
heightF: '',
weightS: '',
heightS: '',
groupOfHealth: '',
diet: '',
cityR: '',
streetR: '',
houseR: '',
flatR: '',
telephoneR:'',
cityL: '',
streetL: '',
houseL: '',
flatL: '',
telephoneL: '',
whoIs: '',
firstNameW: '',
lastNameW: '',
patronymicW: ''
  }
  
  isReady:boolean;
  Edit: boolean;
  url="assets/profile.png";
  formGroups: FormGroup;
  dialogConfig: { disableClose: boolean; data: {} };
  isReadyDiet: boolean;

  groupsFoodDiet: Groupdiet[] = [
    { diet:false, value:'Общий'},
    { diet:true, value:'Диета'},
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
 
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
public dialogRef: MatDialogRef<ViewChildrenComponent>,
    private location: Location,
    private MainService: MainService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  //  this.viewChild();
    this.formGroups = new FormGroup({
      lastName:new FormControl(null, [Validators.required]),
      firstName:new FormControl(null, [Validators.required]),
      patronymic:new FormControl(null, [Validators.required]),
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
      
   /*   parents: new FormArray([
    new FormGroup({
        lastName:new FormControl(null, [Validators.required]),
firstName:new FormControl(null, [Validators.required]),
patronymic:new FormControl(null, [Validators.required])
        })  ])*/
        parents: this.fb.array([]),
  });
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
   /* */   this.formGroups.get('diet').setValue(this.data.item.diet);
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
    }
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

  save(){ 
  /*   this.MainService.updateChild(this.r).subscribe(data => { 
      //  this.isLoading = false;
    const  id= +this.route.snapshot.paramMap.get('id')
        const newvalue = data ? this.records.findIndex(h => h.id === data.id) : -1;
        if (newvalue > -1) {
          this.records[newvalue] = data;
        }
        console.log('Record1',this.Record);
      })
      console.log('Record2',this.Record);
    this.Edit = false;*/
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
