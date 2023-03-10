import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { Customer, DBService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  flag : boolean = false;
  constructor(private db: DBService) { }

  CustomerDetail = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{2,}')]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('[0-9]{4,6}')])
  })

  storedData!: Customer;

  signUp() {
    this.storedData = {
      name: this.CustomerDetail.controls['name'].value,
      phone: this.CustomerDetail.controls['phone'].value,
      email: this.CustomerDetail.controls['email'].value,
      password: this.CustomerDetail.controls['password'].value,
    }

    if (!this.checkEmail(this.storedData.email)) {
      this.db.Customer.push(this.storedData);
    }
  }

  checkEmail(email: any): boolean {
    debugger;
    this.db.Customer.forEach(x => {
      if (x.email == email) {
        this.flag = true;
      }
    })
    return this.flag;
  }

  get name() {
    return this.CustomerDetail.get('name');
  }

  get phone() {
    return this.CustomerDetail.get('phone');
  }

  get email() {
    return this.CustomerDetail.get('email');
  }

  get password() {
    return this.CustomerDetail.get('password');
  }
}
