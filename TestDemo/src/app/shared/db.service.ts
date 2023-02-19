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
    return this.http.get<Employee>('http://localhost:3000/Employee').pipe();
  }

  postDate(data: Employee) {
    return this.http.post('http://localhost:3000/Employee', data).pipe();
  }

  postCredentials(data: Credential) {
    return this.http.post('http://localhost:3000/auth', data).pipe();
  }

  getEmployeeId(authData: Credential) {
    let emp = this.http.get<Employee>('http://localhost:3000/Employee?email=' + authData.username).pipe();

    authData.empId = emp.subscribe(x => {return x.id}).unsubscribe;

    this.postCredentials(authData).subscribe();
  }
}

export class Customer {
  name: string | any;
  email: string | any;
  phone: number | any;
  password: string | any;
}

export class Employee {
  id: number | any;
  name: string | any;
  email: string | any;
  phone: number | any;
}

export class Credential {
  id: number | any;
  empId: number | any;
  username: string | any;
  password: string | any;
}
