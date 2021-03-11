import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, ViewChild,OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {TaskserviceService} from '../../services/taskservice.service';
import {SubtaskserviceService} from '../../services/subtaskservice.service';
import {PrimaryTask} from '../modal/PrimaryTask';
import {EmployeeService} from '../employee.service';;

@Component({
  selector: 'app-add-dependency',
  templateUrl: './add-dependency.component.html',
  styleUrls: ['./add-dependency.component.css']
})
export class AddDependencyComponent implements OnInit {

  subtasks:any;
  str:string;
  task:PrimaryTask;
  temp_task:string[]=[
    // {
    //       taskId:1,
    //       taskName: 'Sprint Planning',
    //       description:'Create app using Angular and springboot',
    //       employeeId:1,
    //       startDate:'4-03-2021',
    //       endDate: '9-03-2021',
    //       estimatedHours:3,
    //       creatorId:3,
    //      modifierId:3
    //     }
  ]
  ngOnInit() {
    
      //console.log(this.str);
  }

  constructor(private service:EmployeeService,private primarytaskservice:TaskserviceService,private subtaskservice:SubtaskserviceService) {
    
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((session:any| null) => session ? this._filter(session) : this.subtasks.slice()));
    this.service.getAllSubTasksById(this.subtaskservice.getPrimaryid()).subscribe(
      (data)=>{console.log(data);this.subtasks=data;}
  
    );
      
          //console.log("noway"+this.tasks);
          //this.primarytaskservice.setTasks(this.tasks);
          //console.log("hello"+this.primarytaskservice.getTasks());
  }

  

  visible = true;
  selectable = true;
  removable = true;
  
  separatorKeysCodes: number[] = [ENTER, COMMA];
 fruitCtrl = new FormControl();
  filteredFruits: Observable<any>;


  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

 

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    console.log("value is"+value);
   
    // Add our fruit
    if ((value || '').trim()) {
     
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
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
  //  this.task.taskName=event.option.viewValue;
    this.temp_task.push(event.option.viewValue);
   //  console.log("task is"+ this.task+event.option.value+"  dhjd"+event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: any):any {

    const filterValue = value.toLocaleLowerCase();
   // console.log(filterValue+"filtervalue"+"taks"+this.tasks);
    //for(var j=0;j<this.sessionItems.length;j++)
    //console.log( this.tasks.filter(task => task.taskName.toLocaleLowerCase().indexOf(filterValue) === 0));
    return this.subtasks.filter(task => task.taskName.toLocaleLowerCase().indexOf(filterValue) === 0);
  }

}
