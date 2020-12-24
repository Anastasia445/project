import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { Location } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-choose-grouptype',
  templateUrl: './choose-grouptype.component.html',
  styleUrls: ['./choose-grouptype.component.css']
})
export class ChooseGrouptypeComponent implements OnInit {

  groupType:any;
  isLoading = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  type=[
    {id: 1, name: "Первая младшая"},
    {id: 2, name: "Вторая младшая"},
    {id: 3, name: "Средняя"},
    {id: 4, name: "Старшая"}
  ];

  constructor(private MainService: MainService,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    this.getGroupTypes();
  }

  getGroupTypes(){
    this.MainService.getGroupTypes()
    .subscribe(types => {this.groupType = types,
    this.isLoading = false;})
  }

  onSelect(type){
    this.router.navigate(['/group', type.id])
  }

  goBack(): void {
    this.location.back();
  }

}
