import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAttendingComponent } from './table-attending.component';

describe('TableAttendingComponent', () => {
  let component: TableAttendingComponent;
  let fixture: ComponentFixture<TableAttendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAttendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAttendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
