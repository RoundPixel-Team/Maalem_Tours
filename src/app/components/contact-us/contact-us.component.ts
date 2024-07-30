import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  sendmessage!: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.sendmessage = this.formBuilder.group({

      Name: ['', Validators.required],
      subject: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]

    });
  }
  get f() { return this.sendmessage.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.sendmessage.invalid) {
      return;
    }
    this.sendmessage.reset()
  }

  onReset() {
    this.submitted = false;
    this.sendmessage.reset();
  }

}
