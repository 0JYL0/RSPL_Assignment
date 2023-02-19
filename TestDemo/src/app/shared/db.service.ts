import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(private router: Router, private http: HttpClient) { }

  public isLoggedin: boolean = false;

  public Customer: Customer[] = [{ name: 'Jayal', email: 'j@gmail.com', phone: 12345, password: '1234' }];

  employeeDetails !: Array<Employee>;

  authenticate(data: Customer): boolean {
    let flag: boolean = false;
    this.Customer.forEach(x => {
      if (x.email == data.email && x.password == data.password) {
        localStorage.setItem('CurrentUser', JSON.stringify(x))
        this.isLoggedin = true;
        flag = true;
      }
    });
    return flag;
  }

  logout() {
    localStorage.removeItem('CurrentUser');
    this.router.navigate(['Login']);
  }

  getdata() {
    return this.http.get<Employee[]>('http://localhost:3000/Employee').pipe();
  }

  postDate(data: Employee) {
    return this.http.post('http://localhost:3000/Employee', data).pipe();
  }

  postCredentials(data: Credential) {
    return this.http.post('http://localhost:3000/auth', data).pipe();
  }

  GetEmployeeDetails(email: string) {
    return this.http.get<Employee>('http://localhost:3000/Employee?email=' + email).pipe();
  }

  getEmployeeId(authData: Credential) {
    let empId: any;

    this.AssignValue();

    console.log(this.employeeDetails);


    console.log('check : ', empId);

    authData.empId = empId;

    this.postCredentials(authData).subscribe();
  }

  AssignValue(): Array<Employee> {

    this.getdata().subscribe((x) => {

      this.employeeDetails = x;
      console.table(x);
      

    })
    return this.employeeDetails
  }
}

export class Customer {
  name: string | any;
  email: string | any;
  phone: number | any;
  password: string | any;
}

export class Employee {
  id!: number;
  name!: string;
  email!: string;
  phone!: number;
}

export class Credential {
  id: number | any;
  empId: number | any;
  username: string | any;
  password: string | any;
}
