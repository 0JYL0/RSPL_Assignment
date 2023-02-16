import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(private router : Router) { }

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

  logout(){
    localStorage.removeItem('CurrentUser');
    this.router.navigate(['Login']);
  }

}

export class Customer {
  name: string | any;
  email: string | any;
  phone: number | any;
  password: string | any;
}
