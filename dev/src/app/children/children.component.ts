import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MainService } from '../services/main.service';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { children } from './children';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {

  [x: string]: any;
  displayedColumns: string[] = [
    'lname',
    'fname',
    'patronymic',
    'dateBorn'
  ];

  length:number;
  dataSource: any;
  records: children[];
  isReady:boolean;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  isLoading = true;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private MainService: MainService,
    private route: ActivatedRoute,
    public Auth: AuthService,
    private location: Location) 
    {    }

  ngOnInit() {
   this.getchildren();
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getchildren(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.MainService.getchildren(id).subscribe(results=>
    {
      this.isLoading = false;
      this.records = results;
      this.dataSource = new MatTableDataSource(this.records);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.records);
    });
  }

  onNoClick(): void {}

  goBack(): void {
    this.location.back();
  }

}
