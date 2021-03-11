import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angular4-social-login';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { EmployeeService} from '../employee.service'
@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.css']
})
export class GoogleAuthComponent implements OnInit {
 
  myImage : string ='assets/images/sprint_img.jpeg'; 
  message:any;
  password:any;
  username:string;

  ngOnInit() {
    
  }

  form: FormGroup = new FormGroup({});
  user: any;
  constructor(private _socioAuthServ: AuthService,private router:Router, private service:EmployeeService) { }

  public signIn()
  {
    if(!this.username)
    {
      alert("Please Enter Username to continue");
    }
   let response=this.service.AuthenticateEmployeeByName(this.username);
 
   response.subscribe(data=>
     {
     this.message=data;
     var pswd=this.message.password;
     var pswd2=this.password;
     if(this.message && (pswd===pswd2))
     {
      
       this.router.navigateByUrl('/task-list');
     }
     else if(this.message && pswd2=='')
     {
       alert("Please Enter password to continue");
     }
     else if(this.username=='')
     {
      alert("Please Enter Username to continue");
     }
     else
     {
       alert("Invalid Credentials");
     }
     }
     );
 }

 singInWithGoogle(platform : string): void {
    platform = GoogleLoginProvider.PROVIDER_ID;
    this._socioAuthServ.signIn(platform).then(
      (employee) => {
       console.log(platform + " logged in employee data is= " , employee);
        this.user = employee;
        let response =   this.service.AuthenticateEmployee(this.user.email);
        response.subscribe(data => {
           this.message = data;
           if(this.message)
           {
             this.router.navigateByUrl('/task-list');
          }
        })
      });
    }

 

  
  signOut(): void {
    this._socioAuthServ.signOut();
    this.user = null;
    console.log('User signed out.');
  }
}