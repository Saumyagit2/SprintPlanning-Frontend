import { Component,Inject, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import {Session} from '../modal/session'
import { TaskListComponent } from '../task-list/task-list.component';
import { ThrowStmt } from '@angular/compiler';
import { PrimaryTask } from '../modal/PrimaryTask';
import {EmployeeService} from '../employee.service';
import {TaskserviceService} from '../../services/taskservice.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})

export class TaskUpdateComponent implements OnInit {
 sessionForm!: FormGroup;
//   constructor(@Inject(MAT_DIALOG_DATA) public data: {taskname: string,description:string,start:string,end:string,index:number}, 
//   private sessionService: SessionService, private dialogRef:MatDialogRef<TaskListComponent>) { }
task:any;
tasks:any;

constructor(@Inject(MAT_DIALOG_DATA) public data: {taskName: string,description:string,startDate:string,endDate:string,index:number,taskId:number}
,private dialogRef:MatDialogRef<TaskListComponent>,private service:EmployeeService,private router:Router,private taskservice:TaskserviceService){}

ngOnInit(): void {

  
  this.sessionForm = new FormGroup({
  taskname : new FormControl(this.data.taskName, Validators.required),
  description : new FormControl(this.data.description, Validators.required),
  
  });
  }

get taskname() {
return this.sessionForm.get('taskname') as FormControl;
}

get description() {
return this.sessionForm.get('description') as FormControl;
}


  updateValue(){
    const temp_task:any = {
      taskId:this.data.taskId,
      taskName : this.taskname.value,
      description : this.description.value,
      employeeId:1,
    }
    this.task=temp_task;
    this.dialogRef.close();
    let response = this.service.updateTask(this.task);
    response.subscribe(data=>this.tasks=data);
    window.location.reload();
    this.taskservice.setTasks(this.tasks);
    
       
    }

}
