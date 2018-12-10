import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
    data: Array<any>;
  constructor() {
        this.data = [];
  }

  get(key: string, observable) {
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
          if (obj.observable instanceof Observable) {
              obj.observable.subscribe((a) => {
                  localStorage.setItem(obj.key, JSON.stringify(a));
                  result.next(a);
              });
          } else {
              localStorage.setItem(obj.key, JSON.stringify(obj.observable));
          }
      });
  }

}
