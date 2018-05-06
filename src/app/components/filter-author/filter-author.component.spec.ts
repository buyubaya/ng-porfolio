import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAuthorComponent } from './filter-author.component';

describe('FilterAuthorComponent', () => {
  let component: FilterAuthorComponent;
  let fixture: ComponentFixture<FilterAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
