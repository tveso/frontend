import {Injectable} from '@angular/core';
import {Repository} from '../entities/Repository';
import {Observable, of, Subject} from 'rxjs';
import {Md5} from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class CacheProxyService {
  private cacheData: Array<Array<any>> = [];
    private repository: Repository;
  constructor() {
    this.repository = new Repository();
  }
  public proxy(key, observable: Observable<any>): Observable<any> {
      key = Md5.hashStr(key);
    if (key in this.cacheData) {
      const ids = this.cacheData[key];
      const data = this.repository.getAll(ids);
      return of(data);
    }
    const result$ = new Subject();
    observable.subscribe((a) => {
      this.repository.addAll(a);
      this.cacheData[key] = a.filter(item => item._id);
      result$.next(a);
    });

    const result =  result$.asObservable();

    return result;
  }
  get(id: string) {
      return this.repository.get(id);
  }
  update(id: string, data: any) {
      this.repository.update(id, data);
  }
 }
