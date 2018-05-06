import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCateComponent } from './filter-cate.component';

describe('FilterCateComponent', () => {
  let component: FilterCateComponent;
  let fixture: ComponentFixture<FilterCateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
