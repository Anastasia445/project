import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaologPayComponent } from './diaolog-pay.component';

describe('DiaologPayComponent', () => {
  let component: DiaologPayComponent;
  let fixture: ComponentFixture<DiaologPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaologPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaologPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
