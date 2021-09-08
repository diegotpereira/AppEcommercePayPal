import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './features/products/pages/product/product.component';
import { ProductListComponent } from './features/products/pages/product-list/product-list.component';
import { AddressComponent } from './features/checkout/components/address/address.component';
import { AddressListComponent } from './features/checkout/components/address-list/address-list.component';
import { CountrySelectComponent } from './features/checkout/components/country-select/country-select.component';
import { BillingAddressComponent } from './features/checkout/pages/billing-address/billing-address.component';
import { CancelPaymentComponent } from './features/checkout/pages/cancel-payment/cancel-payment.component';
import { CustomerComponent } from './features/checkout/pages/customer/customer.component';
import { PaymentComponent } from './features/checkout/pages/payment/payment.component';
import { PlaceOrderComponent } from './features/checkout/pages/place-order/place-order.component';
import { ShippingAddressComponent } from './features/checkout/pages/shipping-address/shipping-address.component';
import { ShippingMethodsComponent } from './features/checkout/pages/shipping-methods/shipping-methods.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    AddressComponent,
    AddressListComponent,
    CountrySelectComponent,
    BillingAddressComponent,
    CancelPaymentComponent,
    CustomerComponent,
    PaymentComponent,
    PlaceOrderComponent,
    ShippingAddressComponent,
    ShippingMethodsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
