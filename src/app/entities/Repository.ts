import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Repository {
    private identifier = '_id';
    private data: Array<any> = [];

    public add(item: object): this {
        if (this.identifier in item) {
            this.data[item[this.identifier]] = item;
        }
        return this;
    }
    public addAll(items: Array<any>): this {
        items.forEach(this.add.bind(this));
        return this;
    }
    public getAll(items: Array<any>): Array<any> {
        return items.filter(this.hasItem.bind(this));
    }
    public hasItem(item: any): boolean {
        if (!(this.identifier in item)) {
            return false;
        }
        return item[this.identifier] in this.data;
    }

    get(id: string) {
        return this.data[id];
    }

    update(id: string, data: any) {
        this.data[id] = data;
    }
}
