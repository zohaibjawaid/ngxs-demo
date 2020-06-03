import { Injectable } from '@angular/core';
import {Customer} from './models/customer.model.';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  fetchCustomers() {
    return this.http.get<Customer[]>('http://localhost:4200/customers');
  }

  deleteCustomer(name: string) {
    return this.http.delete('http://localhost:4200/customers/' + name);
  }

  addCustomer(payload: Customer) {
    return this.http.post<Customer>('http://localhost:4200/customers', payload);
  }
}
