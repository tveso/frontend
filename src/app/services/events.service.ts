import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  events: Map<string, EventEmitter<any>> = new Map<string, EventEmitter<any>>();
  constructor() {
  }
  public listen(name: string): EventEmitter<any> {
     this.createIfNotExists(name);
     const event = this.getEvent(name);
      return event;
  }

  public emit(name: string, value: any) {
      const event = this.getEvent(name);
      event.emit(value);
  }

    private createEvent(name: any) {
        this.events.set(name, new EventEmitter<any>());
    }

    private createIfNotExists(name: any) {
        if (typeof this.events.get(name) === 'undefined') {
            this.createEvent(name);
        }
    }
    private getEvent(name: string): EventEmitter<any> {
      this.createIfNotExists(name);

      return this.events.get(name);
    }
    public clearEvents() {
        this.events = new Map<string, EventEmitter<any>>();
    }
}
