import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorHandlerService } from 'src/app/shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';
import { CustomerAddress } from '../models/customer-address';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressService {

  private url: string = `${environment.apiUrl}/api/customer_addresses`;

  constructor(
    private http: HttpClient, 
    private eh: HttpErrorHandlerService
  ) { }

  createCustomerAddress(addressId: string, customerId: string): Observable<CustomerAddress> {
    return this.http.post<CustomerAddress>(this.url, {
      addressId: addressId, customerId: customerId
    }).pipe(catchError(this.eh.handleError));
  }

  getCustomerAddresses(): Observable<CustomerAddress[]> {
    return this.http.get<CustomerAddress[]>(`${this.url}`).pipe(catchError(this.eh.handleError));
  }

  getCustomerAddress(id:string): Observable<CustomerAddress>{

    return this.http.get<CustomerAddress>(`${this.url}/${id}`).pipe(catchError(this.eh.handleError));
  }
}
