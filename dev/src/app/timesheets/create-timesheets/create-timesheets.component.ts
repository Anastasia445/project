import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { children } from 'src/app/children/children.component';
import { MainService} from 'src/app/services/main.service'
import { Location } from '@angular/common';
import { DiaologCauseComponent } from '../diaolog-cause/diaolog-cause.component'; 
import { MatPaginator } from '@angular/material/paginator';
import { DiaologPayComponent } from '../diaolog-pay/diaolog-pay.component';
import * as moment from 'moment';
import { saveAs } from 'file-saver';

interface Month {
  value: number;
  viewValue: string;
}

export interface causes {
  id: number;
  causes:[
    {
      year: number;
      month: number;
      day: number;
      cause: string;
      causeBol:boolean;
    }];
}

@Component({
  selector: 'app-create-timesheets',
  templateUrl: './create-timesheets.component.html',
  styleUrls: ['./create-timesheets.component.css']
})
export class CreateTimesheetsComponent implements OnInit {

  displayedColumns: string[]; /*= ['FIO', 'payment','1', '2','3','4','5',
  '6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24',
  '25','26','27','28','29', '30', '31', 'cause', 'col', 'good', 'bad', 'comment'];*/
  dataSource: any;
  mode: ProgressSpinnerMode = 'indeterminate';
  isLoading = true;
  days: Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  absent: string[] = ['good', 'bad'];
  causeAbsent: string;
  records: children[];
  child: /*children[]*/any;
  [x: string]: any;
  selected=-1;
  getMonth: boolean;
  chouseDay: boolean = true;
  gAbsent: any;

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
  selectedValue:any = this.d.getMonth()+1;

  month:any;
  year:any;
  children: any;
  //child:any;
  neww:any;
  days: Array<number> = []; 
  day2: number;
  kol2: any = 28;
  dayAbsent: boolean = false;
  //templateName: boolean = true;
  colTrue: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedDate: string = moment().format('YYYY-MM-DD');

  onSelectDate(event): void {
    this.selectedDate = moment(event).format('YYYY-MM-DD')
  }

  downloadTimesheet(){
      this.MainService.downloadTimesheet(this.route.snapshot.paramMap.get('id'),this.selectedValue).subscribe((file) => {
        saveAs(file,`табель-${moment(this.selectedDate).format('DD.MM.YYYY')}.docx`);
  })
  }

  daysInMonth() {
    const today = new Date();
    const year2 = today.getFullYear();
    const month2 = this.selectedValue;
    const day2 = new Date(year2, month2, 0).getDate();
   // console.log("1",this.toDate2 = {year: year2, month: month2, day: day2});
    const  kol3 = new Date(this.today.getFullYear(), this.selectedValue, 0).getDate();
    this.kol2 = kol3;
    this.getMonth = true;
    this.Days();
    this.findMonth();
  }

    today = new Date();
    kol = this.daysInMonth();
    monthNow = this.today.getMonth()+1;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private MainService: MainService) { }
    
  ngOnInit() {
    this.getchildren(this.route.snapshot.paramMap.get('id'))
    this.daysInMonth();
   // this.getMonth = true;
  }
  kolGoodAbsent: number = 0;

  updateTableAbsent(){
    const date = this.selectedValue;
    this.isLoading = false;
    this.getchildren(this.route.snapshot.paramMap.get('id'));
    this.selectedValue = date;
  }

  tableNumbers(){
    const id = +this.route.snapshot.paramMap.get('id');
    return id;
  }
   tableNumber = +this.route.snapshot.paramMap.get('id');

  getchildren(id): void {
  //  const id = +this.route.snapshot.paramMap.get('id');
    this.MainService.getchildren(id).subscribe(results=>
    {
      this.isLoading = false;
      this.child = results;
      this.dataSource = new MatTableDataSource(this.child);
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

  }
  )}

  countAbsent(){
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
    })
  }
 
  show: boolean = false;
  valueGood: boolean =false;
  count: number = 0;
  count2: number = 0;
  check: boolean = false;
  check2: boolean = false;
  payed: boolean = false;
  ex: {}
  pair = {};
  pair2 = {};

  isCorrect(element,days){
    return element.cause.some(t=> t.day === days)
  }

  kolGood:number;
  trackByElement(){
   this.kolGood++;
  }

  f: any;
  s1: number = 0;
  sum(element,bol,month2): void{   
    return element.cause.some(t=> t.causeBol === bol && t.month === month2)
  }

  absentCount(element,days,month2){
    return element.cause.some(t=> t.day === days && t.month === month2)
  }

  absentCause(element,month2){
  return element.cause.some(t=> t.month === month2)
}
    
  payment(pay: boolean,element:any){
  }
   
  countGoodAbsent(id){
    this.MainService.getGoodAbsent(id).subscribe(results=>
      {
     // console.log(results);
    });
  }

  sum1(){
    this.records.forEach(n=>{
    })
  }


  pair3 ={}
  count3: number = 0;

  countGood(completed: boolean,element:any){  
    if(this.pair3[element.id] === undefined){
      this.pair3[element.id] = 0;}
       if(completed == true){
        this.count3++;
        this.pair3[element.id]+=1;
      
        } else if(completed == false)
        {
          this.count3--;
          this.pair3[element.id]-=1;
        }
   }

   pair4 ={}
   count4: number = 0;

  countBad(completed: boolean,element:any){  
    if(this.pair4[element.id] === undefined){
      this.pair4[element.id] = 0;}
        if(completed == true){
          this.count4++;
          this.pair4[element.id]+=1;
        } else if(completed == false)
        {
          this.count4--;
          this.pair4[element.id]-=1;
        }
  }
  
  day31: boolean;
  day30: boolean;
  day29: boolean;
  Days(){
    if(this.kol2 == 31){
      this.day31 = true;
      this.day30 = true;
      this.day29 = true;
      this.displayedColumns = ['FIO', 'payment','1', '2','3','4','5',
      '6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24',
      '25','26','27','28','29', '30', '31', 'cause', 'col', 'good', 'bad', 'comment'];
    } else  if(this.kol2 == 30){
      this.day31 = false;
      this.day30 = true;
      this.day29 = true;
      this.displayedColumns = ['FIO', 'payment','1', '2','3','4','5',
      '6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24',
      '25','26','27','28','29', '30', 'cause', 'col', 'good', 'bad', 'comment'];
    }  else  if(this.kol2 == 29){
      this.day31 = false;
      this.day30 = false;
      this.day29 = true;
      this.displayedColumns = ['FIO', 'payment','1', '2','3','4','5',
      '6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24',
      '25','26','27','28','29', 'cause', 'col', 'good', 'bad', 'comment'];
    } else  if(this.kol2 == 28){
      this.day31 = false;
      this.day30 = false;
      this.day29 = false;
      this.displayedColumns = ['FIO', 'payment','1', '2','3','4','5',
      '6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24',
      '25','26','27','28', 'cause', 'col', 'good', 'bad', 'comment'];
    }
  }  

  number: any;

  addAbsentGood(item,elem,value): void{
    const dialogRef = this.dialog.open(DiaologCauseComponent, {
      disableClose: true, 
      data: { 
        //item,
        id: elem,
        year: this.today.getFullYear(),
        month: this.selectedValue,
        day: item,
        causeBol: value
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       this.MainService.addcause(result.group).subscribe((result2) => {
         this.isLoading = false;
         this.getchildren(this.route.snapshot.paramMap.get('id'));
       });
      }  
    });
    }

    confirmPay(item): void{
      const dialogRef = this.dialog.open(DiaologPayComponent, {
        disableClose: true, 
        data: { 
          //item,
          id: item,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
         this.MainService.updateChild(result.group).subscribe((result2) => {
            this.isLoading = false;
         this.getchildren(this.route.snapshot.paramMap.get('id'));
         });
      }
      });
    }
 
    oldMonth: boolean = true;
    findMonth(){
      const month2 = this.selectedValue;
      const month = this.today.getMonth()+1;
      if(month2 < month){
        this.oldMonth = true;
      } else if(month2 == month){
        this.oldMonth = false;
      } else if(month2 > month){
        this.oldMonth = true;
      }
    }

  goBack(): void {
     this.location.back();
  }

}
