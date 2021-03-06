import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {MainService} from 'src/app/services/main.service';
import { Location } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-choose-group',
  templateUrl: './choose-group.component.html',
  styleUrls: ['./choose-group.component.css']
})
export class ChooseGroupComponent implements OnInit {

  isLoading = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  timesheets: any;
  records:any;

  constructor(private MainService: MainService,
      private dialog: MatDialog,
      private route: ActivatedRoute,
      private router: Router,
      private location: Location) { }

  ngOnInit(): void {
    this.getGroupByGroupType(this.route.snapshot.paramMap.get('id'))
  }

  getGroupByGroupType(id){
    this.MainService.getGroupByType(id)
    .subscribe(records => {this.records = records,
      this.isLoading = false})
  }

  onSelect(group){
    this.router.navigate(['/timesheets', group.id])
  }
  
  goBack(): void {
    this.location.back();
  }

}
