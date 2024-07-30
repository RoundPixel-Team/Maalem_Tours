import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserManagmentService } from 'rp-travel-ui';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public user = inject(UserManagmentService)
  subscription : Subscription = new Subscription()

  constructor(
    private dialog:MatDialog,
    public translate : TranslateService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.user.initRegisterForm()

    this.subscription.add(this.user.userChange.subscribe((res)=>{
      if(res == 'logedin' || res == 'signedup'){
        this.dialog.closeAll()
      }
    }))
  }

  onSubmit(){
    this.user.regitserSubmit('')
  }


  toLogin(){
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(LoginComponent,{panelClass: 'autModal'});
  }

  closeDialog(){
    this.dialog.closeAll()
  }

}
