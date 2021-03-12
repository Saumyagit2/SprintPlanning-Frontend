import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import {SubTask} from '../modal/SubTask';
import {EmployeeService} from '../employee.service';
import {SubtaskserviceService} from '../../services/subtaskservice.service';

@Component({
  selector: 'app-sub-task',
  templateUrl: './sub-task.component.html',
  styleUrls: ['./sub-task.component.css']
})
export class SubTaskComponent implements OnInit {
  taskForm!: FormGroup;
  message:any;
  subtask:SubTask;
   subtasks:any;
  constructor(private router:Router,private service:EmployeeService 
    ,private subtaskservice:SubtaskserviceService) { }

    ngOnInit(): void{
      this.taskForm = new FormGroup({
      taskname : new FormControl('', Validators.required),
        description : new FormControl('', Validators.required),
        status:new FormControl(''),
        priority:new FormControl(''),
        start : new FormControl(''),
        end : new FormControl(''),
        estimatedhours:new FormControl(''),
      });
  
    }
    get taskname() {
      return this.taskForm.get('taskname') as FormControl;
    }
  
    get description() {
      return this.taskForm.get('description') as FormControl;
    }
    get status()
    {
      return this.taskForm.get('status') as FormControl;
    }
    get priority()
    {
      return this.taskForm.get('priority') as FormControl;
    }
    get start() {
      return this.taskForm.get('start') as FormControl;
    }
    get end() {
      return this.taskForm.get('end') as FormControl;
    }
    get estimatedhours() {
      return this.taskForm.get('estimatedhours') as FormControl;
    }
    addToList()
    {
     
      const temp_task:SubTask = 
      {
        subtaskName : this.taskname.value,
        description : this.description.value,
        primarytaskId:this.subtaskservice.getPrimaryid(),
        estimatedHours :this.estimatedhours.value,
        status:this.status.value,
        priority:this.priority.value,
        startDate: this.start.value,
        endDate: this.end.value,
     
      }
      console.log(this.status.value);
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
  
  
  





