import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Api} from '../entities/api';
import {Subject} from 'rxjs';
import {SecurityService} from './security.service';
import {StorageService} from './persistence/storage.service';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private genres: any;
    private _config = new Subject<any>();
    constructor(private http: HttpClient, private securityService: SecurityService, private storage: StorageService) { }
    private apiuri = `${Api.API_URL}config/`;

    init() {
        let finished = 0;
        const numObservables = 2;
        const checkDone = () => {
            if (finished === numObservables) {
                this._config.complete();
            }
        };
        this.storage.get('genres', this.getGenresResources()).subscribe((a) => {
            this.genres = a;
            finished  += 1;
            checkDone();
        });
        this.storage.get('user', this.securityService.checkAuth()).subscribe((a) => {
            this.securityService.setUser(a.user);
            finished  += 1;
            checkDone();
        });
        this.storage.init();
        return this._config.asObservable();

    }
    getGenresResources() {
        return this.http.get(`${this.apiuri}genres`);
    }

    getGenres(type: any = null) {
        if (type !== null && this.genres instanceof Array) {
            return this.genres.filter((a) => {
                return a.type === type;
            });
        }
        return this.genres;
    }

}
