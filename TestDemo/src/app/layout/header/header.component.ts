import { Component, OnInit } from '@angular/core';
import { CustomPipePipe } from 'src/app/shared/custom-pipe.pipe';
import { Customer, DBService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private db: DBService, private custom: CustomPipePipe) {
  }

  getData: any = localStorage.getItem('CurrentUser');
  currentUser!: Customer


  test : any = [];

  name !: string;
  ngOnInit(): void {
    this.currentUser = JSON.parse(this.getData);
    if (this.currentUser != null) {
      this.name = this.custom.transform(this.currentUser.name);
    }
  }

  logout() {
    this.db.logout();
  }
}
