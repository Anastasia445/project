import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaologCauseComponent } from './diaolog-cause.component';

describe('DiaologCauseComponent', () => {
  let component: DiaologCauseComponent;
  let fixture: ComponentFixture<DiaologCauseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaologCauseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaologCauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
