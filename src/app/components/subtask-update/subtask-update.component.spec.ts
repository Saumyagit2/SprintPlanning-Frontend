import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtaskUpdateComponent } from './subtask-update.component';

describe('SubtaskUpdateComponent', () => {
  let component: SubtaskUpdateComponent;
  let fixture: ComponentFixture<SubtaskUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtaskUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtaskUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
