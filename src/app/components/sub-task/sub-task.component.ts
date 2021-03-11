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
  // addToList(){
  //   const session:Session = {
  //     taskname : this.taskname.value,
  //     description : this.description.value,
  //     start : this.start.value,
  //     end: this.end.value
  //   }
  //   this.sessionService.addSessions(session);
  //   this.router.navigateByUrl('/subtask-list');
  // }
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
      employeeId:1,
      startDate: this.start.value,
      endDate: this.end.value,
      estimatedHours :20,
      creatorId:1,
      modifierId:1
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
    this.sessionService.addSessions(session);
    console.log(session);
    this.router.navigateByUrl('/task-list');
  }
  
  deleteSession(sessionToDelete: Session){
    this.sessionService.deleteSession(sessionToDelete) 
  }
}
  
  
  





