import {Component, OnInit} from '@angular/core';
import {GetCustomer, RemoveCustomer} from '../actions/customer.actions';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {CustomerStateModel} from '../state/customer.state.';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {

  @Select(state => state.customers.customers) customers$: Observable<CustomerStateModel>;

  constructor(private store: Store) {
  }

  removeCustomer(name) {
    this.store.dispatch(new RemoveCustomer(name));
  }

  ngOnInit() {
    this.store.dispatch(new GetCustomer());
  }

}
