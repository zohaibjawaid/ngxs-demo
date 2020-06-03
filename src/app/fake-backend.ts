import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';

let customers = [{name: 'Zohaib'}];
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {

        case url.endsWith('/customers') && method === 'POST':
          return saveCustomer();
        case url.endsWith('/customers') && method === 'GET':
          return getCustomers();
        case url.match(/\/customers\/\w+$/) && method === 'DELETE':
          return deleteCustomer();

        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function saveCustomer() {
      customers.push(body);

      return ok(body);
    }

    function getCustomers() {
      return ok([...customers]);
    }

    function deleteCustomer() {
      customers = customers.filter(x => x.name !== nameFromUrl());
      return ok();
    }


    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function nameFromUrl() {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1];
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
