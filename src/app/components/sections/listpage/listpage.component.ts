import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {PeopleService} from '../../../services/people.service';
import {ListService} from '../../../services/list.service';
import {TitleService} from '../../../services/title.service';
import {List} from '../../../entities/list';
import {ImageService} from '../../../services/image.service';
import {shuffle, slugify} from '../../utils/functions';
import {CreatelistComponent, EditlistComponent} from '../createlist/createlist.component';
import {MatDialog} from '@angular/material';
import {UserService} from '../../../services/user.service';
import {SharedService} from '../../../entities/page.abstract';

@Component({
  selector: 'app-listpage',
  templateUrl: './listpage.component.html',
  styleUrls: ['./listpage.component.scss']
})
export class ListpageComponent implements OnInit {
    public list: List;
    public List = List;
    private poster: any;
  constructor(private titleService: TitleService, private activatedRouter: ActivatedRoute,
              private imageService: ImageService, private listService: ListService, private route: ActivatedRoute,
              public dialog: MatDialog, public userService: UserService, private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
      this.sharedService.add(this.activatedRouter.data);
      this.activatedRouter.data.subscribe((data) => {
          this.list = data['list'];
          this.titleService.setTitle(this.list.title);
          this.generatePoster();
      });

  }

  public loadMovies(params: any) {
      params.type = 'movie';
      return this.listService.movies(this.list._id.$oid, params);
  }
    public loadTvshows(params: any) {
        params.type = 'tvshow';
        return this.listService.tvshows(this.list._id.$oid, params);
    }

    public loadPeople(params: any) {
      params.type = 'person';
        return this.listService.people(this.list._id.$oid, params);
    }

    public loadEpisodes(params: any) {
      params.type = 'episode';
      return this.listService.episodes(this.list._id.$oid, params);
    }


    private generatePoster() {
        this.poster = `url(${this.imageService.getImageUrl(this.getRandomPoster(), 'w1280')})`;
    }

    private getRandomPoster() {
        let result = [];
        this.list.episodes.forEach(a => result.push(a.image));
        this.list.movies.forEach(a => result.push(a.image));
        this.list.tvshows.forEach(a => result.push(a.image));
        this.list.people.forEach(a => result.push(a.image));
        result = shuffle(result).slice(0, 1);
        if (result.length === 0) {
            return '';
        }
        return result[0];
    }

    openEditDialog() {
            this.dialog.open(EditlistComponent, {
                panelClass: 'dialog',
                hasBackdrop: true,
                data: {list: this.list},
                width: '80%',
                backdropClass: 'dialog-overlay-black',
                position: {top: '0'}
            }).afterClosed().subscribe((a) => {
                if (typeof a === 'undefined' || !(a instanceof List)) {
                    return;
                }
                this.list = a;
            });
        }

    isEditable() {
        return this.list.user._id.$oid === this.userService.getUser().id.$oid;
    }

}

@Component({
    selector: 'app-listpagemovies',
    templateUrl: './listpagemovies.component.html',
    styleUrls: ['./listpage.component.scss']
})
export class ListPageMoviesComponent implements OnInit {
    private list: any;
    constructor(private titleService: TitleService, private listService: ListService, private sharedService: SharedService) { }


    ngOnInit(): void {
        this.sharedService.observer.subscribe((a) => {
            this.list = a['list'];
        });
    }

    public loadMovies(params: any) {
        params.type = 'movie';
        return this.listService.movies(this.list._id.$oid, params);
    }

}

@Component({
    selector: 'app-listpagetvshows',
    templateUrl: './listpagetvshows.component.html',
    styleUrls: ['./listpage.component.scss']
})
export class ListPageTvshowsComponent implements OnInit {
    private list: any;
    constructor(private titleService: TitleService, private listService: ListService, private sharedService: SharedService) { }


    ngOnInit(): void {
        this.sharedService.observer.subscribe((a) => {
            this.list = a['list'];
        });
    }

    public loadTvshows(params: any) {
            params.type = 'tvshow';
        return this.listService.tvshows(this.list._id.$oid, params);
    }

}
@Component({
    selector: 'app-listpagepeople',
    templateUrl: './listpagepeople.component.html',
    styleUrls: ['./listpage.component.scss']
})
export class ListPagePeopleComponent implements OnInit {
    private list: any;
    constructor(private titleService: TitleService, private listService: ListService, private sharedService: SharedService) { }


    ngOnInit(): void {
        this.sharedService.observer.subscribe((a) => {
            this.list = a['list'];
        });
    }

    public loadPeople(params: any) {
        params.type = 'person';
        return this.listService.people(this.list._id.$oid, params);
    }

}
@Component({
    selector: 'app-listpageepisodes',
    templateUrl: './listpageepisodes.component.html',
    styleUrls: ['./listpage.component.scss']
})
export class ListPageEpisodesComponent implements OnInit {
    private list: List;
    constructor(private titleService: TitleService, private listService: ListService, private sharedService: SharedService) { }


    ngOnInit(): void {
        this.sharedService.observer.subscribe((a) => {
            this.list = a['list'];
        });
    }

    public loadEpisodes(params: any) {
        params.type = 'episode';
        return this.listService.episodes(this.list._id.$oid, params);
    }

}
@Component({
    selector: 'app-listpageinfo',
    templateUrl: './listpageinfo.component.html',
    styleUrls: ['./listpage.component.scss']
})
export class ListPageInfoComponent implements OnInit {
    private list: List;
    constructor(private titleService: TitleService, private listService: ListService, private sharedService: SharedService) { }


    ngOnInit(): void {
        this.sharedService.observer.subscribe((a) => {
            this.list = a['list'];
        });
    }

}
@Injectable()
export class ListPageResolver implements Resolve<any> {
    constructor(private listService: ListService) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        return this.listService.get(route.params.id);
    }
}
