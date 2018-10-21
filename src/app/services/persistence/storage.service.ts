import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
    data: Array<any>;
  constructor() {
        this.data = [];
  }

  get(key: string, observable: Observable<any>) {
      let find = this.data.find(a => a.key === key);
      if (find === null || typeof find === 'undefined') {
          find = {key: key, observable: observable, subscriber: new Subject()};
          this.data.push(find);
      }
      return find.subscriber.asObservable();
  }
  init() {
      this.data.forEach((obj) => {
          const dataLs = JSON.parse(localStorage.getItem(obj.key));
          const result = obj.subscriber;
          if (dataLs !== null) {
              result.next(dataLs);
          }
          obj.observable.subscribe((a) => {
              localStorage.setItem(obj.key, JSON.stringify(a));
              result.next(a);
          });
      });
  }

}
