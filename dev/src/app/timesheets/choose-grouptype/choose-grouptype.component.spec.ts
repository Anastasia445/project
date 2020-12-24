import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseGrouptypeComponent } from './choose-grouptype.component';

describe('ChooseGrouptypeComponent', () => {
  let component: ChooseGrouptypeComponent;
  let fixture: ComponentFixture<ChooseGrouptypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseGrouptypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseGrouptypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
