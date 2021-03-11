import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { SessionService } from '../session.service'
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import {Session} from '../modal/session'
import { TaskListComponent } from '../task-list/task-list.component';
import { PrimaryTask } from '../modal/PrimaryTask';
import {EmployeeService} from '../employee.service';
import { ThrowStmt } from '@angular/compiler';
import {SubTaskComponent} from '../sub-task/sub-task.component';
import {TaskserviceService} from '../../services/taskservice.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit
{
  tasks:any;
  message:any;
  task:PrimaryTask;
  sessionForm!: FormGroup;
  constructor(private router:Router,private sessionService:SessionService, private service:EmployeeService,
    private taskservice:TaskserviceService) {
      
     }

  ngOnInit(): void{
    this.sessionForm = new FormGroup({
   //   taskname : new FormControl('', Validators.required),
      taskname : new FormControl(''),
      description : new FormControl('', Validators.required),
      start : new FormControl(''),
      end : new FormControl('')
    });

  }
  get taskname() {
    return this.sessionForm.get('taskname') as FormControl;
  }

  get description() {
    return this.sessionForm.get('description') as FormControl;
  }


  get start() {
    return this.sessionForm.get('start') as FormControl;
  }
  get end() {
    return this.sessionForm.get('end') as FormControl;
  }
  

  /*onClick()
  {
    this.router.navigateByUrl('/task-list');
  }*/
  onClick()
  {
    const session :Session = {
      taskname : this.taskname.value,
      description : this.description.value,
      start: this.start.value,
      end: this.end.value
    }
    //console.log(this.user.name);
    const temp_task:PrimaryTask = {
      taskName : this.taskname.value,
      description : this.description.value,
      employeeId:1,
      startDate: this.start.value,
      endDate: this.end.value,
      estimatedHours :20,
      creatorId:1,
      modifierId:1
    }
    this.task=temp_task;
    let response =   this.service.addPrimaryTask(this.task);
        response.subscribe(data => {
          this.message =   data;
          
          console.log(this.message);
        })
        let respon = this.service.getAllTasks();
        respon.subscribe(
          data=>this.tasks=data
          );
    this.taskservice.setTasks(this.tasks); 
    this.router.navigateByUrl('/task-list');
  }

 
}