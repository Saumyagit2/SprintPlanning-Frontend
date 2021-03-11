import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { SessionService } from '../session.service'
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import {Session} from '../modal/session'
import { SubtaskListComponent} from '../subtask-list/subtask-list.component';
import { ThrowStmt } from '@angular/compiler';
import {SubTask} from '../modal/SubTask';
import {EmployeeService} from '../employee.service';
import {SubtaskserviceService} from '../../services/subtaskservice.service';

@Component({
  selector: 'app-sub-task',
  templateUrl: './sub-task.component.html',
  styleUrls: ['./sub-task.component.css']
})
export class SubTaskComponent implements OnInit {
  sessionForm!: FormGroup;
  message:any;
  subtask:SubTask;
   subtasks:any;
  constructor(private router:Router,private sessionService:SessionService,private service:EmployeeService 
    ,private subtaskservice:SubtaskserviceService) { }

    ngOnInit(): void{
      this.sessionForm = new FormGroup({
      taskname : new FormControl('', Validators.required),
        description : new FormControl('', Validators.required),
        status:new FormControl(''),
        priority:new FormControl(''),
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
    get status()
    {
      return this.sessionForm.get('status') as FormControl;
    }
    get priority()
    {
      return this.sessionForm.get('priority') as FormControl;
    }
    get start() {
      return this.sessionForm.get('start') as FormControl;
    }
    get end() {
      return this.sessionForm.get('end') as FormControl;
    }
  
    addToList()
    {
      const session :Session = {
        taskname : this.taskname.value,
        description : this.description.value,
        start: this.start.value,
        end: this.end.value
      }
      //console.log(this.user.name);
      const temp_task:SubTask = {
        subtaskName : this.taskname.value,
        description : this.description.value,
        primarytaskId:this.subtaskservice.getPrimaryid(),
        estimatedHours :20,
        status:this.status.value,
        priority:this.priority.value,
        startDate: this.start.value,
        endDate: this.end.value,
     
      }
      this.subtask=temp_task;
      let response =   this.service.addSubTask(this.subtask);
          response.subscribe(data => {
            this.message =   data;
            
            console.log(this.message);
          })
  
          let respon = this.service.getAllTasks();
          respon.subscribe(
            data=>this.subtasks=data
            );
      this.subtaskservice.setSubtasks(this.subtasks); 
      this.router.navigateByUrl('/task-list');
    }
}
  
  
  





