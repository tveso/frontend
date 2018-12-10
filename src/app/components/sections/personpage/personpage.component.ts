import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {PeopleService} from '../../../services/people.service';
import {ImageService} from '../../../services/image.service';

@Component({
    selector: 'app-personpage',
    templateUrl: './personpage.component.html',
    styleUrls: ['./personpage.component.scss']
})
export class PersonpageComponent implements OnInit {
    person: any;
    poster = '';
    public callback;
    private jobs: any;

    constructor(private activatedRouter: ActivatedRoute, private router: Router, private imageService: ImageService,
                private peopleService: PeopleService) {
    }

    ngOnInit() {
        this.getShows();
        this.activatedRouter.data.subscribe((data) => {
            this.person = data['person'];
            this.poster = '';
            this.getShows();
        });
    }
    getProfileImage() {
        const poster = this.imageService.getImageUrl(this.person.profile_path, 'w1280');
        return `url(${poster})`;
    }
    private load(params) {
       return this.peopleService.getShowsByPerson(this.person.id, params);
    }

    private getShows() {
        this.callback = this.load.bind(this);
    }
    getMoreInfo(show) {
        if (show.typecredit === 'cast') {
            return show.character;
        }
        if (show.typecredit === 'crew') {
            return `${show.job}<br>${show.department}`;
        }
    }

    getAge() {
        const birthday = new Date(this.person.birthday);
        const ageDifMs = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
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
