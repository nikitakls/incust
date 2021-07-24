import {Component, OnInit} from '@angular/core';
import {DataService, Product} from '../../services/data.service';
import {StorageService} from '../../services/storage.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products: Product[] = [];
  query: string;
  queryChanged: Subject<string> = new Subject<string>();

  constructor(private data: DataService, private storage: StorageService) {
    this.queryChanged.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(query => {
      this.query = query;
      this.storage.setQuery(query);
      this.getProducts();
    });
  }

  ngOnInit(): void {
    this.storage.getQuery().then(q => {
      this.query = q;
      this.getProducts();
    });
  }

  getProducts() {
    this.products = this.data.getProducts(this.query);
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  queryInputChanged(text: string) {
    this.queryChanged.next(text);
  }

}
