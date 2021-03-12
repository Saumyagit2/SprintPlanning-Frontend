import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubtaskserviceService {

  subtasks:any;

  primaryid:any;


  getPrimaryid()
  {
    return this.primaryid;
  }
  setPrimaryid(primaryid)
  {
     this.primaryid=primaryid;
  }

  getSubtasks()
  {
     return this.subtasks;
  }
  setSubtasks(subtasks)
  {
     this.subtasks=subtasks;
  }


}
