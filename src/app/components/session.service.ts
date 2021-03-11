import { Injectable } from '@angular/core';
import { Session} from './modal/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  sessionItems: Session[] = [
    {

      taskname: 'Sprint Planning',
      description:'Create app using Angular and springboot',
      start:'4-03-2021',
      end: '9-03-2021'
       },


       {

        taskname: 'MCQ App',
        description:'create a quiz app',
        start:'10-03-2021',
        end: '17-03-2021'
         },
         {

          taskname: 'Malware detection',
          description:'Antivirus Software using blockchain and deep learnng',
          start:'18-03-2021',
          end: '27-03-2021'
           },
     ]
     
  constructor() { }
  getSessions() {
    return this.sessionItems;
  }

  addSessions(session:Session) {
    this.sessionItems.push(session);
  }

  deleteSession(session:Session){
    for(let item of this.sessionItems){
        if((item.taskname === session.taskname) && (item.start === session.start) &&(item.end===session.end)&& (item.description===session.description)){
          this.sessionItems.splice(this.sessionItems.indexOf(item),1);
          return true;
        }

    }
    return false;
  }

  updateSession(index:number,session:Session){
    this.sessionItems[index].taskname = session.taskname;
     this.sessionItems[index].description = session.description;
     this.sessionItems[index].start = session.start;
     this.sessionItems[index].end =session.end;
  }



}
