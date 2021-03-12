import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Session} from '../modal/session'
import {Router} from '@angular/router';
import {EmployeeService} from '../employee.service';
import {TaskUpdateComponent} from '../task-update/task-update.component'
import { TaskserviceService} from '../../services/taskservice.service';
import {SubtaskserviceService} from '../../services/subtaskservice.service';
import {SubtaskUpdateComponent} from '../subtask-update/subtask-update.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks:any;
  subtasks:any;
  panelOpenState=false;
  status: boolean = false;
  sessionItems!: Session[];
  constructor(private service:EmployeeService,private dialog:MatDialog,private router:Router,
    private taskservice:TaskserviceService,private subtaskservice:SubtaskserviceService) { }
  ngOnInit(): void {
    this.tasks = this.taskservice.getTasks();
    let response1 = this.service.getAllSubTasks();
    response1.subscribe(
      data=>this.subtasks=data
    );
  
    let response = this.service.getAllTasks();
    response.subscribe(
      data=>this.tasks=data
      );
     this.taskservice.setTasks(this.tasks);
     
     }
    
  
  updateTask(i:number){
    this.dialog.open(TaskUpdateComponent, {
      width:'300px',    
      data:{
        taskName : this.tasks[i].taskName,
        description:this.tasks[i].description,
        startDate:this.tasks[i].startDate,
        endDate:this.tasks[i].endDate,
        index:i,
        taskId:this.tasks[i].taskId
      }     
    });
  
  }

  
  updateSubTask(i:number){
    this.dialog.open(SubtaskUpdateComponent, {
      width:'300px',    
      data:{
        subtaskName : this.subtasks[i].subtaskName,
        description:this.subtasks[i].description,
        startDate:this.subtasks[i].startDate,
        endDate:this.subtasks[i].endDate,
        index:i,
        subtaskId:this.subtasks[i].subtaskId
      }     
    });
  }
  
  removesubTask(id:number)
  {
      let response = this.service.deleteSubTaskByid(id);
      response.subscribe(data=>this.subtasks=data);
      this.router.navigateByUrl('/task-list');
  }

addSubTask(id:number)
{
  this.subtaskservice.setPrimaryid(id);
  this.router.navigateByUrl('/sub-task');
}

   removeTask(id:number)
   {
       let response = this.service.deleteTaskByid(id);
       response.subscribe(data=>this.tasks=data);
   }
   addTask()
   {

    this.router.navigateByUrl('/add-task');
   }
   viewSubTasks(id:number)
   {
        this.subtaskservice.setPrimaryid(id);
        let response = this.service.getAllSubTasksById(id);
        response.subscribe(data=>this.subtasks=data);    
   }
}
