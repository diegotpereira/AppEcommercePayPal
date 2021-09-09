import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormControlDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Order, UpdateOrderParams } from 'src/app/data/models/order';
import { CartService } from 'src/app/data/services/cart.service';
import { OrderService } from 'src/app/data/services/order.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css']
})
export class CodesComponent {

  couponCode = new FormControl('');
  giftCardCode = new FormControl('');

  @ViewChild(FormControlDirective) codesDirective: FormControlDirective | undefined;

  constructor(
    private cart: CartService,
    private order: OrderService,
    private snackBar: MatSnackBar
  ) { }

  private updateOrder(order: Order, params: UpdateOrderParams[], codeType: string) {
    this.order.updateOrder(order, params).subscribe(() => {
      this.snackBar.open(`Adicionado com sucesso ${codeType} código.`, 'Close', { duration: 8000});
      this.couponCode.reset();
      this.giftCardCode.reset();
      this.codesDirective?.reset();
    },
    err => this.snackBar.open(`Escreveu com sucesso ${codeType} código.`, 'Close', { duration: 8000})) ;
  }

  addGiftCard() {
    this.updateOrder({ id: this.cart.orderId, giftCardCode: this.giftCardCode.value}, [UpdateOrderParams.giftCardCode], 'gift card');
  }
  ngOnInit(): void {
  }

}