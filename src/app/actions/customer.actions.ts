import {Customer} from '../models/customer.model.';

export class AddCustomer {
  static readonly type = '[CUSTOMER] Add';

  constructor(public payload: Customer) {}
}

export class RemoveCustomer {
  static readonly type = '[CUSTOMER] Remove';

  constructor(public payload: string) {}
}
