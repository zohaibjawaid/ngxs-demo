import { Component, OnInit } from '@angular/core';
import {Store} from '@ngxs/store';
import {AddCustomer} from '../actions/customer.actions';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  constructor(private store: Store) { }

  addCustomer(name) {
    this.store.dispatch(new AddCustomer({name}));
  }

  ngOnInit(): void {
  }

}
