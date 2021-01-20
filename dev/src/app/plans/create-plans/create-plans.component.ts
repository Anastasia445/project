import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from 'src/app/services/main.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { plans } from '../plans.component';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Location } from '@angular/common';
interface Month {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-create-plans',
  templateUrl: './create-plans.component.html',
  styleUrls: ['./create-plans.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class CreatePlansComponent implements OnInit {

  dataSource = [{}];
  formGroups: FormGroup;
  displayedColumns: string[] = ['subject', 'day1','day2','day3','day4','day5'];
  records: plans[];
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  isLoading = false;
  allplans: any;
  [x: string]: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  getMonth: boolean;
  isShow: boolean = true;
  week: any;
  chouseDate:any;
  chouseDate2:any;
  chouseDate3:any;
  chouseDate4:any;
  chouseDate5:any;

  months: Month[] = [
    {value: 1, viewValue: 'Январь'},
    {value: 2, viewValue: 'Февраль'},
    {value: 3, viewValue: 'Март'},
    {value: 4, viewValue: 'Апрель'},
    {value: 5, viewValue: 'Май'},
    {value: 6, viewValue: 'Июнь'},
    {value: 7, viewValue: 'Июль'},
    {value: 8, viewValue: 'Август'},
    {value: 9, viewValue: 'Сентябрь'},
    {value: 10, viewValue: 'Октябрь'},
    {value: 11, viewValue: 'Ноябрь'},
    {value: 12, viewValue: 'Декабрь'}
  ];
  d = new Date();
  selectedValue: number=this.d.getMonth();

  daysInMonth() {
    const today = new Date();
    const year2 = today.getFullYear();
    const month2 = this.selectedValue;
    const day2 = new Date(year2, month2, 0).getDate();
    const  kol3 = new Date(this.today.getFullYear(), this.selectedValue, 0).getDate();
    this.kol2 = kol3;
  }
    today = new Date();
    kol = this.daysInMonth();
    monthNow = this.today.getMonth()+1;

  constructor(public Auth: AuthService,
    private MainService: MainService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
    }

    myFilter = (d: any): boolean => {
      const day = d.weekday(); 
      return day !== 0 && day !== 2 && day !== 3 && day !== 4 && day !== 5 && day !== 6;
    }
  
    minDate = new Date(this.today.getFullYear(), 0, 1);
    maxDate = new Date(this.today.getFullYear(), 11, 31);

  roles: string;
  id: string;
  ngOnInit(): void {
    this.roles = this.getRole('roles');
    this.id = this.getId('id');
    this.formGroups = new FormGroup({
      // id: new FormControl(this.id),
       name: new FormControl(null, [Validators.required]),
       days: new FormArray([
         new FormGroup({
           day: new FormControl(),
           plans: new FormControl('')
         }),
         new FormGroup({
           day: new FormControl(),
           plans: new FormControl('')
         }),
         new FormGroup({
           day: new FormControl(),
           plans: new FormControl('')
         }),
         new FormGroup({
           day: new FormControl(),
           plans: new FormControl('')
         }),
         new FormGroup({
           day: new FormControl(),
           plans: new FormControl('')
         })
       ]),
       subjects: new FormArray([
         new FormGroup({
           name: new FormControl(''),
         })
       ])
     });
  
   /* this.addSubjects();
    this.addDays();
    this.addDays();
    this.addDays();
    this.addDays();
    this.addDays();*/
    

  
    // days = this.formGroups.get('days') as FormArray;
 // subjects = this.formGroups.get('relatives') as FormArray;
  }

  getId(number: string): string{
    return localStorage.getItem(number);
  }

  getRole(roles: string): string{
    return localStorage.getItem(roles);
  }
  
  /*addDays(){
    const control = new FormGroup({
      day: new FormControl(''),
      plans: new FormControl(''),
    })
    this.days.push(control);
  }  

  addSubjects(){
    const control = new FormGroup({
      name: new FormControl(''),
    })
    this.subjects.push(control);
  }  */

  createPlan(){
  
  }
  
  t: plans[];
  group: any;
  onSubmitGroups(){
    this.formGroups.getRawValue();
    const group = this.formGroups.value;
    this.MainService.createPlan(group,this.id).subscribe((result2) => {
      this.goBack();
    });
  }
 day1:any;
 day2:any;
 day3:any;
 day4:any;
 day5:any;
  chouseWeek(){
    this.isShow = false;
    this.chouseDate = new Date(this.week._i.year,this.week._i.month,this.week._i.date);
    this.chouseDate2 = new Date(this.week._i.year,this.week._i.month,this.week._i.date+1);
    this.chouseDate3 = new Date(this.week._i.year,this.week._i.month,this.week._i.date+2);
    this.chouseDate4 = new Date(this.week._i.year,this.week._i.month,this.week._i.date+3);
    this.chouseDate5 = new Date(this.week._i.year,this.week._i.month,this.week._i.date + 4);
    this.day1 = new Date(this.week._i.year,this.week._i.month,this.week._i.date+1);
    this.day2 = new Date(this.week._i.year,this.week._i.month,this.week._i.date+2);
    this.day3 = new Date(this.week._i.year,this.week._i.month,this.week._i.date+3);
    this.day4 = new Date(this.week._i.year,this.week._i.month,this.week._i.date+4);
    this.day5 = new Date(this.week._i.year,this.week._i.month,this.week._i.date +5);
    console.log(this.chouseDate);
    this.formGroups = new FormGroup({
      // id: new FormControl(this.id),
       name: new FormControl(null, [Validators.required]),
       days: new FormArray([
         new FormGroup({
           day: new FormControl(this.day1),
           plans: new FormControl('')
         }),
         new FormGroup({
           day: new FormControl( this.day2),
           plans: new FormControl('')
         }),
         new FormGroup({
           day: new FormControl( this.day3),
           plans: new FormControl('')
         }),
         new FormGroup({
           day: new FormControl( this.day4),
           plans: new FormControl('')
         }),
         new FormGroup({
           day: new FormControl( this.day5),
           plans: new FormControl('')
         })
       ]),
       subjects: new FormArray([
         new FormGroup({
           name: new FormControl(''),
         })
       ])
     });
  }

  goBack(): void {
    this.location.back();
  }

}
