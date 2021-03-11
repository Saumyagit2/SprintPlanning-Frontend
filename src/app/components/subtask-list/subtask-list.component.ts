import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import {Session} from '../modal/session'
import {EmployeeService} from '../employee.service';
import { SubTaskComponent} from '../sub-task/sub-task.component';
import {SubtaskUpdateComponent} from '../subtask-update/subtask-update.component';
import {SubtaskserviceService} from '../../services/subtaskservice.service';

@Component({
  selector: 'app-subtask-list',
  templateUrl: './subtask-list.component.html',
  styleUrls: ['./subtask-list.component.css']
})
export class SubtaskListComponent implements OnInit {
    subtasks:any;
  sessionItems!: Session[];

  constructor(private router:Router,private service:EmployeeService,private dialog:MatDialog
    ,private subtaskservice:SubtaskserviceService) { }

  ngOnInit():void {

     let response = this.service.getAllSubTasksById(this.subtaskservice.getPrimaryid());
     response.subscribe(data=>this.subtasks=data);    
      this.subtaskservice.setSubtasks(this.subtasks);
      this.subtasks = this.subtaskservice.getSubtasks();
  }
  removesubTask(id:number)
  {
      let response = this.service.deleteSubTaskByid(id);
      response.subscribe(data=>this.subtasks=data);
      this.router.navigateByUrl('/task-list');
  }

  updateSubTask(i:number){
    this.dialog.open(SubtaskUpdateComponent, {
      width:'300px',    
      data:{
        subtaskName : this.subtasks[i].subtaskName,
        description:this.subtasks[i].description,
        status:this.subtasks[i].status,
        priority:this.subtasks[i].priority,
        startDate:this.subtasks[i].startDate,
        endDate:this.subtasks[i].endDate,
        index:i,
        subtaskId:this.subtasks[i].subtaskId
      }     
    });
  }
  addSubTask()
  {
  this.router.navigateByUrl('sub-task');
  }
}
