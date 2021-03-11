import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }


  public AuthenticateEmployee(email)
  {
    return this.http.get("http://localhost:8080/search/"+email);
  }
  public addPrimaryTask(task)
  {
    return this.http.post("http://localhost:8080/addPrimary",task,{responseType : "text" as "json"});
  }
  public getAllTasks()
  {
    return this.http.get("http://localhost:8080/all-Tasks/");
  }
  public deleteTaskByid(id)
  {
      return this.http.get("http://localhost:8080/delete/"+id);
  }
  public deleteSubTaskByid(subTaskId)
  {
      return this.http.get("http://localhost:8080/deletesubtask/"+subTaskId);
  }
  public addSubTask(subtask)
  {
    return this.http.post("http://localhost:8080/addSub/",subtask,{responseType : "text" as "json"});
  }
  public getAllSubTasks()
  {
    return this.http.get("http://localhost:8080/all-SubTasks/");
  }



  public updateTask(task)
  {
    return this.http.put("http://localhost:8080/updateTask/",task,{responseType : "text" as "json"});
  }

  public updateSubTask(subtask)
  {
    return this.http.put("http://localhost:8080/updateSubTask/",subtask,{responseType : "text" as "json"});
  }

  public getAllSubTasksById(id)
  {
    return this.http.get("http://localhost:8080/getAllSubtasks/"+id);
  }
  public AuthenticateEmployeeByName(username)
  {
   return this.http.get("http://localhost:8080/searchUser/"+username);
  }

}
