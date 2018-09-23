import { Injectable } from '@angular/core';
import {Observer, Subject} from 'rxjs';

@Injectable()
export class MessageService {
    observer: Subject<Map<any, any>>;
    messages: Map<any, any>;
    constructor() {
        this.messages = new Map<any, any>();
        this.observer = new Subject();
    }
    add(key: any, message: any) {
        this.messages.set(key, message);
        this.observer.next(this.messages);
    }
    listen() {
        return this.observer.asObservable();
    }

}
