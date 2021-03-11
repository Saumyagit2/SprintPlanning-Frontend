import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDependencyComponent } from './add-dependency.component';

describe('AddDependencyComponent', () => {
  let component: AddDependencyComponent;
  let fixture: ComponentFixture<AddDependencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDependencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDependencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
