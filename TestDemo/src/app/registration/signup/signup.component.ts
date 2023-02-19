import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer, DBService } from 'src/app/shared/db.service';
import { Employee, Credential } from '../../shared/db.service';
import { async, take } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  flag: boolean = false;
  constructor(private db: DBService) { }

  CustomerDetail = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{2,}')]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('[0-9]{4,6}')])
  })

  storedData!: Customer;

  async signUp() {
    debugger;
    this.storedData = {
      name: this.CustomerDetail.controls['name'].value,
      phone: this.CustomerDetail.controls['phone'].value,
      email: this.CustomerDetail.controls['email'].value,
      password: this.CustomerDetail.controls['password'].value,
    }

    let employee: Employee = {
      id: 0,
      name: this.storedData.name,
      phone: parseInt(this.storedData.phone),
      email: this.storedData.email
    };
    let credential: Credential = {
      id: 0,
      empId: 0,
      username: this.storedData.email,
      password: this.storedData.password
    };

    this.db.postDate(employee).subscribe().unsubscribe();

    let data;
    await this.db.getdata().subscribe(async (x) => {
      await console.log('data assigned : ', data = x, 'po', x);

      await x.forEach(e => {
        if (e.email == credential.username) {
          credential.empId = e.id;
          console.log(credential.empId = e.id);
        }
        console.log(e.id);
      })

    });

    console.log(data);

    this.db.getEmployeeId(credential);

    if (!this.checkEmail(this.storedData.email)) {
      this.db.Customer.push(this.storedData);
      return true;
    }
    return false;
  }

  checkEmail(email: any): boolean {
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
