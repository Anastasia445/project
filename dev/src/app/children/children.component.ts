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
    'description'
  ];
 // records = new MatTableDataSource<main>(this.main);
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
    public Auth: AuthService,
    private location: Location) 
    {
    setTimeout(()=> {
    this.isReady = true;}, 600);
    }

  ngOnInit() {
  //  this.getchildren();
  }

  getchildren(): void {
    const childrenId = +this.route.snapshot.paramMap.get('id');
    this.MainService.getchildren(childrenId).subscribe(results=>
    {
      this.records = results;
      this.dataSource = new MatTableDataSource(this.records);
      console.log(this.userComment);
    });
  }

  onNoClick(): void {}

  goBack(): void {
    this.location.back();
  }

}
