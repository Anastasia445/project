
import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from 'src/app/services/main.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { children } from 'src/app/children/children.component';
import { group } from 'src/app/main-page/main-page.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

interface Month {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-table-attending',
  templateUrl: './table-attending.component.html',
  styleUrls: ['./table-attending.component.css']
})
export class TableAttendingComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['FIO', 'visits', 'count', 'good', 'bad'];
  dataSource2: any;
  displayedColumns2: string[] = ['visit', 'kol'];
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  isLoading = true;
  groups: group[];
  [x: string]: any;
  records: children[];
  child: /*children[]*/any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  table=[{}];
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
  selectedValue: number=this.d.getMonth()+1;

  daysInMonth() {
    const today = new Date();
    const year2 = today.getFullYear();
    const month2 = this.selectedValue;
    const day2 = new Date(year2, month2, 0).getDate();
   // console.log("1",this.toDate2 = {year: year2, month: month2, day: day2});
    const  kol3 = new Date(this.today.getFullYear(), this.selectedValue, 0).getDate();
    this.kol2 = kol3;
    this.getMonth = true;
   // this.findMonth();
   console.log(this.weekdays12); 
   //this.getVisits();
  }

    today = new Date();
    monthNow = this.today.getMonth()+1;


  constructor(public Auth: AuthService,
    private MainService: MainService,
    private route: ActivatedRoute,
    private location: Location) {
    }

  roles: string;

  ngOnInit(): void {
   this.getchildren(this.route.snapshot.paramMap.get('id'));
  //  this.roles = this.getRole('roles');
  this.daysInMonth();
  this.findMonth();

  }

  kolGoodAbsent: number = 0;
  getchildren(id): void {
    this.MainService.getchildren(id).subscribe(results=>
    {
      this.isLoading = false;
      this.child = results;
      this.dataSource = new MatTableDataSource(this.child);
      this.dataSource2 = new MatTableDataSource(this.table);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.getMonth = false;
      this.child.forEach(n=>{
      let goodAbsent = 0;
      let badAbsent = 0;
     
      n.cause.forEach(t=>{
        if(t.causeBol === true && t.month === this.selectedValue){
          goodAbsent++;
        } 
        if(t.causeBol === false && t.month === this.selectedValue){
          badAbsent++;
        } 
      }) 
    this.pair3[n.id]=goodAbsent
    this.pair4[n.id]=badAbsent
   // this.counttAbsent2(n.cause.causeBol,n)
    })
    this.countAbsent();
  }
  )}
  
 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
   if (this.dataSource.paginator) {
     this.dataSource.paginator.firstPage();
   }
 }

 getRole(roles: string): string{
   return localStorage.getItem(roles);
 }

 pair3 ={}
 count3: number = 0;
 pair4 ={}
 count4: number = 0;
 sum = {};
 summ: number = 0;
 sumVisit: number = 0;
 sumAlldays: number = 0;
 visiable: boolean = false;

 countAbsent(){
  this.sumAlldays =0;
  this.sumVisit = 0;
  this.child.forEach(n=>{
    let goodAbsent = 0;
    let badAbsent = 0;
    let sumVisit;
    n.cause.forEach(t=>{
      if(t.causeBol === true && t.month === this.selectedValue){
        goodAbsent++;
      } 
      if(t.causeBol === false && t.month === this.selectedValue){
        badAbsent++;
      } 
    }) 
    this.pair3[n.id]=goodAbsent
    this.pair4[n.id]=badAbsent
    this.sum =  this.weekdays12 - (this.pair3[n.id] +   this.pair4[n.id]);
    this.sumVisit += this.weekdays12 - (goodAbsent + badAbsent);
  })
    this.sumAlldays = this.weekdays12 * this.child.length;
   // this.visiable = true;
  }

  visits: any;
  getVisits(){
    this.MainService.getVisits(this.route.snapshot.paramMap.get('id'),this.selectedValue).subscribe(t=>
      {
        this.visits=t;
      })
  }

goBack(): void {
  this.location.back();
}

  daysInMonth1(iMonth, iYear)
  {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

  isWeekday(year, month, day) {
    let  day3 = new Date(year, month, day).getDay();
    return day3 !=0 && day3 !=6;
  }

  getWeekdaysInMonth(month, year) {
    let days = this.daysInMonth1(month, year);
    let weekdays = 0;
    for(let i=0; i< days; i++) {
        if (this.isWeekday(year, month, i+1)) weekdays++;
    }
    return weekdays;
    }
  
   weekdays12: any;

  oldMonth: boolean = true;
  yearChouse: number = this.today.getFullYear();
  findMonth(){
    const month2 = this.selectedValue;
    const month = this.today.getMonth()+1;
    if(month < 7 && month2 > 7){
      this.yearChouse = this.yearChouse-1;
    }
    this.weekdays12 = this.getWeekdaysInMonth(month2-1,this.yearChouse);
    //console.log(this.weekdays12);
  }



}
