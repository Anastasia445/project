import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../services/auth.service';
import { MainService } from '../services/main.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

interface Month {
  value: number;
  viewValue: string;
}

export interface plans {
  id: number,
  name: string,
  days: [
    {
      day: string,
      plans: string
    }
  ],
  subjects: [
    {
      name: string
    }
  ]
}

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})

export class PlansComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['name', 'details'];
  dataSource2: any;
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

  roles: string;
  id: string;
  ngOnInit(): void {
    this.roles = this.getRole('roles');
    this.id = this.getId('id');
    this.getPlan();
  }
  
  getId(number: string): string{
    return localStorage.getItem(number);
  }

  getRole(roles: string): string{
    return localStorage.getItem(roles);
  }

  getPlan(): void {
    if(this.roles ==='ROLE_MODERATOR'){
      this.MainService.getPlanByEducatorId(this.id).subscribe(results=>{
        this.allplans = results;
        this.dataSource = new MatTableDataSource(this.allplans);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
        console.log(this.allplans);
      });
    } else if(this.roles ==='ROLE_MODERATOR,ROLE_ADMIN' || this.roles ==='ROLE_ADMIN,ROLE_MODERATOR'){
        this.MainService.getPlans().subscribe(results=>{
          this.allplans = results;
          this.dataSource2 = new MatTableDataSource(this.allplans);
          this.dataSource2.paginator = this.paginator;
          this.isLoading = false;
        });
    }
  }

  onSelect(plan){
    this.router.navigate(['/viewPlan', plan.id])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  records: plans[];
  removePlan(Plan:plans): void { 
      this.isLoading = true;
      this.dataSource.data.splice(this.allplans.indexOf(Plan), 1);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.MainService.deletePlan(Plan).subscribe();
      this.getPlan();
  }

  selectedDate: string = moment().format('YYYY-MM-DD');

  onSelectDate(event): void {
    this.selectedDate = moment(event).format('YYYY-MM-DD')
  }
 
  downloadPlan(){
      this.MainService.downloadPlan(this.id,this.selectedValue).subscribe((file) => {
        saveAs(file,`план-${moment(this.selectedDate).format('DD.MM.YYYY')}.docx`);
  })
  this.isShow = true;
  }

}
