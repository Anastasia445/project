import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MainService} from 'src/app/services/main.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { plans } from 'src/app/plans/plans.component';

@Component({
  selector: 'app-edit-plans',
  templateUrl: './edit-plans.component.html',
  styleUrls: ['./edit-plans.component.css']
})
export class EditPlansComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  isLoading = true;
  allplans: any;
  [x: string]: any;
  
  constructor(
    private MainService: MainService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
    }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
  }

}
