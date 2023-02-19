import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, DBService } from './shared/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private db: DBService, private router: Router) {  }

  CurrentUser!: Customer;

  ngOnInit(): void {
    
    this.db.isLoggedin ? this.router.navigate(['']) : this.router.navigate(['0']);

    let temp: any = (localStorage.getItem('CurrentUser'));
  
    if (temp != null && temp != undefined) {
      this.CurrentUser = JSON.parse(temp);
      this.LogIn();
    }
    this.postdata();
    this.getg()
  }

  getg(){
    this.db.getdata().subscribe(x => {
      console.log('Data :',x)
    })
  }

  postdata(){
    let data = {
      id:3,
      name:"Meet",
      phone:745374596,
      email:"m@gmail.com"
    }
    this.db.postDate(data).subscribe();
  }

  LogIn() {
    if (this.CurrentUser != null && this.CurrentUser != undefined) {
      if (this.db.authenticate(this.CurrentUser)) {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['0']);
    }
  }
}
