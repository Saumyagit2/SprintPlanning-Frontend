import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SessionService } from '../session.service'
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

  constructor(private router:Router,private sessionService:SessionService, private service:EmployeeService,private dialog:MatDialog
    ,private subtaskservice:SubtaskserviceService) { }

  ngOnInit():void {
  
    // let response = this.service.getAllSubTasks();
    // response.subscribe(
    //   data=>this.subtasks=data
    //   );
     // console.log(this.subtasks);
     let response = this.service.getAllSubTasksById(this.subtaskservice.getPrimaryid());
     response.subscribe(data=>this.subtasks=data);    
      this.subtaskservice.setSubtasks(this.subtasks);
      this.subtasks = this.subtaskservice.getSubtasks();
  }


  addSession(){
    this.dialog.open(SubTaskComponent, {
      width:'300px'
    });
  }

  deleteSession(session:Session){
    if(this.sessionService.deleteSession(session)){
      return this.sessionService.getSessions();
    }
    return this.sessionService.getSessions();
  }
  // updateSession(i:number){
  //   this.dialog.open(TaskUpdateComponent, {
  //     width:'300px',
  //     data: { taskname: this.sessionService.sessionItems[i].taskname, 
  //              description: this.sessionService.sessionItems[i].description,
  //              start: this.sessionService.sessionItems[i].start,
  //              end: this.sessionService.sessionItems[i].end,  
  //             index:i
  //          },        
  //   });
   
  // }


  removesubTask(id:number)
  {
      let response = this.service.deleteSubTaskByid(id);
      response.subscribe(data=>this.subtasks=data);
      this.router.navigateByUrl('/task-list');
    //  let respon = this.service.getAllSubTasksById(this.subtaskservice.getPrimaryid());
    //  respon.subscribe(data=>this.subtasks=data);   
    //this.ngOnInit(); 
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
