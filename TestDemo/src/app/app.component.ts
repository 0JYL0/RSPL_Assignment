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
    let temp: any = (localStorage.getItem('CurrentUser'));
    
    if (temp != null && temp != undefined) {
      this.CurrentUser = JSON.parse(temp);
      this.LogIn();
    }
  }

  LogIn() {
    if (this.CurrentUser != null && this.CurrentUser != undefined) {
      if (this.db.authenticate(this.CurrentUser)) {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['Login']);
    }
  }
}
