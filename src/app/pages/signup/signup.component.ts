import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { error } from 'console';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
   constructor(private userService : UserService, private _snack : MatSnackBar){}

   public user = {
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      email: '',
      phoneNumber: '',
      about: '',
      organization: '',
   };

   ngOnInit(): void{}

   formSubmit(){
     //alert("form submited");
     if(this.user.username == '' || this.user.username == null){
        this._snack.open("username is required." ,"OK",{
            duration : 3000,
            verticalPosition : 'top'
        });
        return;
     }
     console.log(this.user);

     //adduser : userservice
     this.userService.addUser(this.user).subscribe({
         next : (data)=>{
            if(data === null){
               console.log('Received null from the server.');
               this._snack.open('User Name already exist.!!', '', {
                 duration: 1000,
               });
            }
            else{
               //success
               console.log(data);
               Swal.fire('Done..','Registration completed.' ,'success');
            }
         },
         error : (e)=>{
            console.log(e);
            this._snack.open('something went wrong.' ,'OK',{
               duration : 3000,
               verticalPosition : 'top'
           });
         }
      });
   }


}
