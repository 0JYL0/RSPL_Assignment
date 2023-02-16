import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Customer, DBService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements DoCheck{

  constructor(private db:DBService) {
  }

  @Input()
  customer !: Customer;
  
  ngDoCheck(): void {
    
  }

  public Customer : Customer[] = this.db.Customer;

  @Output()
  warn = new EventEmitter<Customer>();

}
