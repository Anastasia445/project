import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { children } from 'src/app/children/children.component';
import { MainService} from 'src/app/services/main.service'
import { Location } from '@angular/common';

interface Month {
  value: string;
  viewValue: string;
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
  child: any;
  [x: string]: any;
  selected=-1;
  getMonth: boolean;

  months: Month[] = [
    {value: '1', viewValue: 'Январь'},
    {value: '2', viewValue: 'Февраль'},
    {value: '3', viewValue: 'Март'},
    {value: '4', viewValue: 'Апрель'},
    {value: '5', viewValue: 'Май'},
    {value: '6', viewValue: 'Июнь'},
    {value: '7', viewValue: 'Июль'},
    {value: '8', viewValue: 'Август'},
    {value: '9', viewValue: 'Сентябрь'},
    {value: '10', viewValue: 'Октябрь'},
    {value: '11', viewValue: 'Ноябрь'},
    {value: '12', viewValue: 'Декабрь'}
  ];
  selectedValue: number;

  month:any;
  year:any;
  children: any;
  child:any;
  neww:any;
  days: Array<number> = []; 
  day2: number;
  kol2: any = 28;

  daysInMonth() {
    const today = new Date();
    const year2 = today.getFullYear();
    const month2 = this.selectedValue;
    const day2 = new Date(year2, month2, 0).getDate();
    console.log("1",this.toDate2 = {year: year2, month: month2, day: day2});
    
   const  kol3 = new Date(this.today.getFullYear(), this.selectedValue, 0).getDate();
   console.log(kol3);
    this.kol2 = kol3;
    this.getMonth = true;
    this.Days();
  }

    today = new Date();
    kol = this.daysInMonth();
    

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private MainService: MainService) { }
    
  ngOnInit() {
    this.getchildren(this.route.snapshot.paramMap.get('id'));
    
  }
  getchildren(id): void {
  //  const id = +this.route.snapshot.paramMap.get('id');
    this.MainService.getchildren(id).subscribe(results=>
    {
      this.isLoading = false;
      this.child = results;
      this.dataSource = new MatTableDataSource(this.child);
      console.log(this.child);
      console.log(this.result);
      this.getMonth = false;
    });
  }

  count: number = 0;
  count2: number = 0;
  check: boolean = false;
  check2: boolean = false;
  payed: boolean = false;
  //obj: newObj[];
  ex: {}
  pair = {};
  pair2 = {};
    
  payment(pay: boolean,element:any){

   }

  goodAbsent(completed: boolean,element:any){  
   // console.log(element); 
    if(this.pair[element.id] === undefined){
    this.pair[element.id] = 0;}
      if(completed == true){
      // this.count=0;
      this.count++;
      this.pair[element.id]+=1;
    
      } else if(completed == false)
      {
        this.count--;
        this.pair[element.id]-=1;
      }
      // console.log('count=',this.count);
       console.log(this.pair); 
       console.log(this.kol);
       console.log(this.kol2);
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
    
  badAbsent(completed2: boolean,element:any){
    if(this.pair2[element.id] === undefined){
      this.pair2[element.id] = 0;}
    if(completed2 == true){
      // this.count=0;
     this.count2++;
     this.pair2[element.id]+=1;
     
     } else if(completed2 == false)
       {
         this.count2--;
         this.pair2[element.id]-=1;
       }
     //  console.log('count2=',this.count2);
       console.log(this.pair2);
  }
  goBack(): void {
     this.location.back();
  }

}
