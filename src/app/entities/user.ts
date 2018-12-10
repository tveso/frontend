import {Api} from './api';

class User {
    constructor(user: object) {
        for (const i of Object.entries(user)) {
            const actual = i[1];
            const key = i[0];
            if (user.hasOwnProperty(key)) {
                this[key] = actual;
            }
        }
    }
    public id;
    public _id;
    public username;
    public password;
    public email;
    public avatar;
    data: any;
    roles: Array<any>;

    public getAvatar() {
        return Api.AVATAR_URL + this.avatar;
    }
}

export {User};
