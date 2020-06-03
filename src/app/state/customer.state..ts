import { State, Action, StateContext, Selector } from '@ngxs/store';
import {Customer} from '../models/customer.model.';
import {AddCustomer, GetCustomer, RemoveCustomer} from '../actions/customer.actions';
import {CustomerService} from '../customer.service';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

export class CustomerStateModel {
  customers: Customer[];
}

@State<CustomerStateModel>({
  name: 'customers',
  defaults: {
    customers: []
  }
})
@Injectable()
export class CustomerState {

  constructor(private customerService: CustomerService) {
  }

  // Not required, difined to show only
  @Selector()
  static getCustomers(state: CustomerStateModel) {
    return state.customers;
  }

  @Action(GetCustomer)
  getCustomer({getState, setState}: StateContext<CustomerStateModel>) {
    return this.customerService.fetchCustomers().pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        customers: result,
      });
    }));
  }

  @Action(AddCustomer)
  add({getState, patchState}: StateContext<CustomerStateModel>, {payload}: AddCustomer) {
    return this.customerService.addCustomer(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
        customers: [...state.customers, result]
      });
    }));
  }

  @Action(RemoveCustomer)
  remove({getState, setState }: StateContext<CustomerStateModel>, { payload }: RemoveCustomer) {


    return this.customerService.deleteCustomer(payload).pipe(tap(() => {
      const state = getState();
      const filteredArray = state.customers.filter(a => a.name !== payload);
      setState({
        ...state,
        customers: filteredArray,
      });
    }));
  }

}
