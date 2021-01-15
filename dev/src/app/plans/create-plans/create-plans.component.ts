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

  dataSource: any;
  displayedColumns: string[] = ['name', 'details'];
  dataSource2: any;
  records: plans[];
  displayedColumns2: string[] = ['name'];
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  isLoading = true;
  allplans: any;
  [x: string]: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  getMonth: boolean;
  isShow: boolean = true;

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
    private router: Router) {
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
    this.id = this.getId('id');
    this.formGroups;
    this.addSubjects();
    this.addDays();
    this.addDays();
    this.addDays();
    this.addDays();
    this.addDays();
    
  }

  getId(number: string): string{
    return localStorage.getItem(number);
  }

  formGroups = new FormGroup({
   // id: new FormControl(this.id),
    name: new FormControl(null, [Validators.required]),
    days: new FormArray([]),
    subjects: new FormArray([])
  });
  days = this.formGroups.get('days') as FormArray;
  subjects = this.formGroups.get('relatives') as FormArray;
  
  addDays(){
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
   // this.subjects.push(control);
  }  

  createPlan(){
    this.MainService.createPlan(this.group).subscribe((result2) => {
      this.isLoading = true;
      this.records.push(result2);
      });
  }

   group: any;
  onSubmitGroups(){
    this.formGroups.getRawValue();
    this.group = this.formGroups.value;
  }

}
