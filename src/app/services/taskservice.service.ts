import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  tasks:any;

  constructor() { }
  
  getTasks()
  {
     return this.tasks;
  }
  setTasks(tasks)
  {
     this.tasks = tasks;
  }
  updateTask(index:number,task:any){
    this.tasks[index].taskname = task.tasknameDate;
     this.tasks[index].description = task.descriptionDate;
     this.tasks[index].startDate = task.startDate;
     this.tasks[index].endDate =task.endDate;
  }


}



