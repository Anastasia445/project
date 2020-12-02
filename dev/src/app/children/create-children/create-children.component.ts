import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { style } from '@angular/animations';
import { NgStyle } from '@angular/common';
import { children } from '../children';
import { Location } from '@angular/common';

interface Grouptype {
  value: string;
}

@Component({
  selector: 'app-create-children',
  templateUrl: './create-children.component.html',
  styleUrls: ['./create-children.component.css']
})
export class CreateChildrenComponent implements OnInit {

  records: children[];

  constructor( private location: Location) { }

  ngOnInit(): void {
  }
  siblings = {
    groupSiblings:'groupsSiblings.value',
    
  }
  profile = {
    photo:'',
    lname:'', 
    fname:'', 
    dateBorn:'', 
    group:'group.value',
    heightFirst:'',
    heightSecond:'',
    weightFirst:'',
    weightSecond:'',
    groupHealth:'groupsHealt.value',
    groupType:'groupsType.value',
    groupFoodDiet:'groupsFoodDiet.value',
    groupFoodDietinfo:'',
    comment:'',
    residenceCity:'',
    residenceStreet:'',
    residenceHouse:'',
    residenceFlat:'',
    residencePhone:'',
    nowCity:'',
    nowStreet:'',
    nowHouse:'',
    nowFlat:'',
    nowPhone:'',
    lnameMam:'',
    nameMam:'',
    patronymicMam:'',
    mamEducation:'',
    mamPlaceWork:'',
    mamPosition:'',
    mamPhone:'',
    lnameDad:'',
    nameDad:'',
    patronymicDad:'',
    dadEducation:'',
    dadPlaceWork:'',
    dadPosition:'',
    dadPhone:''
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

    groupsFoodDiet: Grouptype[] = [
      {value: 'Общий'},
      {value: 'Диета'},
    ];

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
 
  foodDietInfo(){
    if(this.groupsFoodDiet)
    {
      this.isReady = true;
    } else
    {
      this.isReady = false;
    }
  }

  save(): void{ 
   console.log(this.profile);
  }
  close(): void {
    this.location.back();
  }
}
