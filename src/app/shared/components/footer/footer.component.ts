import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private router : Router,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
  }

  goToAboutUs(){
    this.router.navigate(['/aboutUs']).then(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
  });
  }

  goToContactUs(){
    this.router.navigate(['/contactUs']).then(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
  });
  }

  goToHome(){
    this.router.navigate(['/']).then(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
  });
  }


  goToPrivacy(){
    this.router.navigate(['/privacyPolicy']).then(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
  });
  }


  goToTermsOfUse(){
    this.router.navigate(['/termsOfUse']).then(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
  });
  }
}
