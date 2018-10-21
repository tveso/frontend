import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {PeopleService} from '../../../services/people.service';
import {ImageService} from '../../../services/image.service';

@Component({
    selector: 'app-personpage',
    templateUrl: './personpage.component.html',
    styleUrls: ['./personpage.component.css']
})
export class PersonpageComponent implements OnInit {
    noMoreData = false;
    private person: any;
    private poster = '';
    private page = 1;
    private showShows = [];
    private shows = [];

    constructor(private activatedRouter: ActivatedRoute, private router: Router, private imageService: ImageService) {
    }

    ngOnInit() {
        this.activatedRouter.data.subscribe((data) => {
            if (Object.keys(data).length === 0 && data.constructor === Object) {
                this.router.navigate(['/home']);
            }
            this.person = data['person'];
            this.person.shows = this.person.crew.concat(this.person.cast);
            this.poster = '';
            this.getBackground();
            this.getTypeShows('movie');
        });
    }

    getBackground() {
        if (this.person.shows.length === 0 || this.poster !== '') {
            return;
        }
        const randomShow = this.person.shows[Math.floor(Math.random() * this.person.shows.length)];
        console.log(randomShow);
        const path = randomShow.backdrop_path;
        const poster = this.imageService.getImageUrl(path, 'w1280');
        this.poster = `url(${poster})`;
    }

    getProfileImage(profile_path: any) {
        const poster = this.imageService.getImageUrl(this.person.profile_path, 'w1280');
        return `url(${poster})`;
    }

    getTypeShows(typeShows) {
        this.page = 1;
        this.shows = [];
        this.noMoreData = false;
        console.log(this.person.shows);
        this.showShows = this.person.shows.filter((a) => {
            return a.type === typeShows;
        });
        this.getShows();
    }

    changeTab(typeOfShow) {
        typeOfShow = (typeOfShow === 0) ? 'movie' : 'tvshow';
        this.getTypeShows(typeOfShow);
    }

    nextPage() {
        this.page += 1;
        this.getShows();
    }

    private getShows() {
        const page = this.page;
        const limit = 30;
        const skip = page * limit;
        if (this.showShows.length <= skip + limit) {
            this.noMoreData = true;
            this.shows = this.showShows;
            return;
        }
        this.shows = this.showShows.slice(0, skip);
    }
}

@Injectable()
class PersonpageResolver implements Resolve<any> {
    constructor(private peopleService: PeopleService) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        return this.peopleService.getById(route.params.id);
    }
}

export {PersonpageResolver};
