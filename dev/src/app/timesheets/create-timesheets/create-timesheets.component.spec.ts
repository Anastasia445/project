import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTimesheetsComponent } from './create-timesheets.component';

describe('CreateTimesheetsComponent', () => {
  let component: CreateTimesheetsComponent;
  let fixture: ComponentFixture<CreateTimesheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTimesheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTimesheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
