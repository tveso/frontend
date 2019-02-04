import {slugify} from '../components/utils/functions';
import {ObjectId} from './objectId';
import {User} from './user';


export class List {
    _id?: ObjectId;
    title?: string;
    keywords?: Array<any>;
    movies?: Array<any>;
    people?: Array<any>;
    tvshows?: Array<any>;
    episodes?: Array<any>;
    user?: User;
    stats?: ListStats;
    created_at?: any;
    description: any;
    static getUrl(list: List): string {
        return `/list/${slugify(list.title)}/${list._id.$oid}`;
    }
}

export class ListStats {
    count?: ListCount;
}

export class ListCount {
    episodes?: Number;
    movies?: Number;
    people?: Number;
    tvshows?: Number;
}
