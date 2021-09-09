import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { combineLatest, concat, iif, Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { SessionService } from 'src/app/core/services/session.service';
import { Address } from 'src/app/data/models/address';
import { AddressService } from 'src/app/data/services/Address.Service';
import { CartService } from 'src/app/data/services/cart.service';
import { CustomerAddressService } from 'src/app/data/services/customer-address.service';
import { OrderService } from 'src/app/data/services/order.service';
import { Order, UpdateOrderParams } from 'src/app/data/models/order';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit {

  showAddress: boolean = false;
  sameBillingAddressAsShipping: boolean = false;
  selectedCustomerAddressId: string = '';

  constructor(
    private addresses: AddressService,
    private snackBar: MatSnackBar,
    private session: SessionService,
    private orders: OrderService,
    private cart: CartService,
    private router: Router,
    private customerAddresses: CustomerAddressService
  ) { }

  ngOnInit(){
    this.session.loggedInStatus$.subscribe(status => this.showAddress = status);
  }

  updateShippingAddress(address: Address) {
    if (this.showAddress && this.selectedCustomerAddressId) {
      this.cloneAddress();
    }else if (address.firstName && address.lastName && address.line1 && address.city && address.zipCode && address.stateCode && address.countryCode && address.phone) {
      this.createAddress(address);
    }else {
      this.snackBar.open('Verifique seu endereço. Alguns campos estão faltando.', 'Close');
    }
  }

  setCustomerAddress(customerAddressId: string) {
    this.selectedCustomerAddressId = customerAddressId;
  }

  setSameBillingAddressAsShipping(change: boolean) {
    this.sameBillingAddressAsShipping = change;
  }

  private createAddress(address: Address) {
    this.addresses.createAddress(address).pipe(concatMap(address => {
      const update = this.updateOrderObservable({
        id: this.cart.orderId,
        shippingAddressId: address.id
      }, [UpdateOrderParams.shippingAddress]);

      if (this.showAddress) {
        return combineLatest([update, this.customerAddresses.createCustomerAddress(address.id || '', '')]);
      }else {
        return update;
      }
    })).subscribe(() => this.showSuccessSnackBar(),
    err => this.showErrorSnackBar());
  }
  private cloneAddress() {
    this.updateOrderObservable({
      id: this.cart.orderId,
      shippingAddressCloneId: this.selectedCustomerAddressId
    }, [UpdateOrderParams.shippingAddressClone])
      .subscribe(
        () => this.showSuccessSnackBar(),
        err => this.showErrorSnackBar()
      );
  }

  private updateOrderObservable(order: Order, updateParams: UpdateOrderParams[]): Observable<any> {
    return iif(() => this.sameBillingAddressAsShipping,
      concat([
        this.orders.updateOrder(order, updateParams),
        this.orders.updateOrder(order, [UpdateOrderParams.billingAddressSameAsShipping])
      ]),
      this.orders.updateOrder(order, updateParams)
    );
  }
  private showErrorSnackBar() {
    this.snackBar.open('Ocorreu um problema ao criar seu endereço.', 'Close', { duration: 8000 });
  }

  private showSuccessSnackBar() {
    this.snackBar.open('Endereço de entrega adicionado com sucesso. Redirecionando...', 'Close', { duration: 3000 });

    setTimeout(() => this.router.navigateByUrl('/shipping-methods'), 4000);
  }
}
