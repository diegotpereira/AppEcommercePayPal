import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorHandlerService } from 'src/app/shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  private url: string = `${environment.apiUrl}/api/shipments`;
  constructor(
    private http: HttpClient,
    private eh: HttpErrorHandlerService
  ) { }

  getShipment(id: string): Observable<Shipment> {
    return this.http.get(Shipment>(`${this.url}/${id}`)).pipe(catch(this.eh.handleError));
  }
}
