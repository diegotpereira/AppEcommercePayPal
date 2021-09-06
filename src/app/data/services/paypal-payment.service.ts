import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorHandlerService } from 'src/app/shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaypalPaymentService {

  private url: string = `${environment.apiUrl}/api/paypal_payments`;
  constructor(
    private http: HttpClient,
    private eh: HttpErrorHandlerService
  ) { }
}
