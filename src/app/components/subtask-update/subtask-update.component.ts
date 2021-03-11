import { Component,Inject, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionService } from '../session.service'
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import {Session} from '../modal/session'
import { SubtaskListComponent } from '../subtask-list/subtask-list.component';
import { ThrowStmt } from '@angular/compiler';
import {EmployeeService} from '../employee.service'
import {SubTask} from '../modal/SubTask'
import {SubtaskserviceService} from '../../services/subtaskservice.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './subtask-update.component.html',
  styleUrls: ['./subtask-update.component.css']
})

export class SubtaskUpdateComponent implements OnInit {
  sessionForm!: FormGroup;
  subtask :any;
  subtasks:any;
  //constructor(@Inject(MAT_DIALOG_DATA) public data: {taskname: string,description:string,start:string,end:string,index:number}, 
  //private sessionService: SessionService,private router:Router, private dialogRef:MatDialogRef<SubtaskListComponent>) { }

  constructor(@Inject(MAT_DIALOG_DATA) public data: {subtaskName: string,description:string,startDate:string,endDate:string,index:number,subtaskId:number}
  ,private dialogRef:MatDialogRef<SubtaskListComponent>,private service:EmployeeService,private router:Router,private subtaskservice:SubtaskserviceService){}
  
ngOnInit(): void {
this.sessionForm = new FormGroup({
taskname : new FormControl(this.data.subtaskName, Validators.required),
description : new FormControl(this.data.description, Validators.required),
start : new FormControl(this.data.startDate),
end: new FormControl(this.data.endDate)
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


  updateValue(){
    const session:Session = {
    taskname : this.taskname.value,
    description : this.description.value,
    start: this.start.value,
    end: this.end.value
    }

    const temp_task:any = {
      subtaskId:this.data.subtaskId,
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
  //console.log(this.data.taskId);

       let response = this.service.updateSubTask(this.subtask);
       response.subscribe(data=>this.subtasks=data);
    //   this.router.navigateByUrl('/subtask-list/12');
       this.dialogRef.close();
       //this.router.navigateByUrl('/task-list');
    }


}
