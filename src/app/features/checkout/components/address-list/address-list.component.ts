import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { iif } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { SessionService } from 'src/app/core/services/session.service';
import { CustomerAddress } from 'src/app/data/models/customer-address';
import { CustomerAddressService } from 'src/app/data/services/customer-address.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  addresses: CustomerAddress [] = [];

  @Output() setAddressEvent = new EventEmitter<string>();
  constructor(
    private session: SessionService,
    private customerAddresses: CustomerAddressService,private snackBar: MatSnackBar
  ) { }

  ngOnInit(){
    this.session.loggedInStatus.pipe(mergeMap(
      status => iif(() => status, this.customerAddresses.getCustomerAddresses())
    )).subscribe( addresses => {
      if (addresses.length) {
        this.addresses = addresses
      }
    },
    err => this.snackBar.open('Ocorreu um problema ao obter seus endereços existentes.', 'Close', { duration: 8000}));
  }

  setAddress(change: MatRadioChange) {
    this.setAddressEvent.emit(change.value);
  }
}