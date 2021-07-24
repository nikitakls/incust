import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService, Product} from '../../services/data.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product-page.component.html',
  styleUrls: ['./view-product-page.component.scss'],
})
export class ViewProductPage implements OnInit {
  public product: Product;
  public amount: number;
  public qty: number;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.product = this.data.getProductById(parseInt(id, 10));
  }

  setAmount(amount: number) {
    this.amount = amount;
    this.reCalc(true);
  }

  setQty(qty: number) {
    this.qty = qty;
    this.reCalc(false);
  }

  reCalc(isAmountChange: boolean = false) {
    if (parseInt(this.product.price.toString(), 10) === 0) {
      this.qty = 0;
      this.amount = 0;
      return;
    }
    if (isAmountChange) {
      this.qty = (this.amount / this.product.price);
    } else {
      this.amount = this.qty * this.product.price;
    }
  }

  reCalcInput(isAmountChange: boolean = false) {
    setTimeout(() => {
      this.reCalc(isAmountChange);
    });
  }
}
