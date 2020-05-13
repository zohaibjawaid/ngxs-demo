import { State, Action, StateContext, Selector } from '@ngxs/store';
import {Customer} from '../models/customer.model.';
import {AddCustomer, RemoveCustomer} from '../actions/customer.actions';

export class CustomerStateModel {
  customers: Customer[];
}

@State<CustomerStateModel>({
  name: 'customers',
  defaults: {
    customers: [{name: 'zohaib'}]
  }
})
export class CustomerState {

  // Not required, difined to show only
  @Selector()
  static getCustomers(state: CustomerStateModel) {
    return state.customers;
  }

  @Action(AddCustomer)
  add({getState, patchState }: StateContext<CustomerStateModel>, { payload }: AddCustomer) {
    const state = getState();
    patchState({
      customers: [...state.customers, payload]
    });
  }

  @Action(RemoveCustomer)
  remove({getState, patchState }: StateContext<CustomerStateModel>, { payload }: RemoveCustomer) {
    patchState({
      customers: getState().customers.filter(a => a.name !== payload)
    });
  }

}
