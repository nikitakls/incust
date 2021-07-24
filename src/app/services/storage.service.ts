import {Injectable} from '@angular/core';

import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly queryKey: string = 'query';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this.storage = await this.storage.create();
  }

  public setQuery(value: string) {
    // localStorage.setItem(this.queryKey, value);
    this.storage?.set(this.queryKey, value);
  }

  public getQuery() {
    // return localStorage.getItem(this.queryKey);
    return this.storage?.get(this.queryKey);
  }
}
