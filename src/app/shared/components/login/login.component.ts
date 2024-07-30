import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserManagmentService } from 'rp-travel-ui';
import { Subscription } from 'rxjs';
import { SignupComponent } from '../signup/signup.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

  public user = inject(UserManagmentService)
  subscription : Subscription = new Subscription()

  constructor(
    private dialog:MatDialog,
    public translate : TranslateService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.user.initLoginForm()

    this.subscription.add(this.user.userChange.subscribe((res)=>{
      if(res == 'logedin' || res == 'signedup'){
        this.dialog.closeAll()
      }
    }))
  }

  onSubmit(){
    this.user.loginSubmit('')
  }


  toSignUp(){
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(SignupComponent,{panelClass: 'autModal'});
  }

  closeDialog(){
    this.dialog.closeAll()
  }

}
