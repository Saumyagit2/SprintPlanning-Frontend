import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild,OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {TaskserviceService} from '../../services/taskservice.service';
import {SubtaskserviceService} from '../../services/subtaskservice.service';
import {PrimaryTask} from '../modal/PrimaryTask';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-add-dependency',
  templateUrl: './add-dependency.component.html',
  styleUrls: ['./add-dependency.component.css']
})
export class AddDependencyComponent implements OnInit {

  subtasks:any;
  str:string;
  task:PrimaryTask;
  temp_task:string[]=[]
  ngOnInit() {
    
  }

  constructor(private service:EmployeeService,private primarytaskservice:TaskserviceService,private subtaskservice:SubtaskserviceService) {
    this.service.getAllSubTasksById(this.subtaskservice.getPrimaryid()).subscribe(
      (data)=>{console.log(data);this.subtasks=data;}
  
    );
  }

  visible = true;
  selectable = true;
  removable = true;  
  separatorKeysCodes: number[] = [ENTER, COMMA];
 taskCtrl = new FormControl();

  @ViewChild('taskInput') taskInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  add(event: MatChipInputEvent): void {
    const input = event.input;

    if (input) {
      input.value = '';
    }

    this.taskCtrl.setValue(null);
  }

  index:number;
  i:number;
  remove(task: any): void {
    console.log(this.temp_task);
    const index = this.temp_task.indexOf(task);
     console.log(index);
    if (index >= 0) {
      this.temp_task.splice(index, 1);
    }
    console.log(this.temp_task);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.temp_task.push(event.option.viewValue);
    this.taskInput.nativeElement.value = '';
    this.taskCtrl.setValue(null);
  }
}
