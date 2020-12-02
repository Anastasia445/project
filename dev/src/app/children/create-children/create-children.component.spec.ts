import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChildrenComponent } from './create-children.component';

describe('CreateChildrenComponent', () => {
  let component: CreateChildrenComponent;
  let fixture: ComponentFixture<CreateChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
