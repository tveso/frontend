import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PeopleService} from '../../../services/people.service';
import {ListService} from '../../../services/list.service';
import {TitleService} from '../../../services/title.service';
import {List} from '../../../entities/list';
import {ImageService} from '../../../services/image.service';
import {shuffle} from '../../utils/functions';
import {MoviesService} from '../../../services/movies.service';
import {FindService} from '../../../services/find.service';

@Component({
  selector: 'app-listpage',
  templateUrl: './listpage.component.html',
  styleUrls: ['./listpage.component.scss']
})
export class ListpageComponent implements OnInit {
    public list: List;
    public List = List;
    private poster: any;
    nav = 'info';
  constructor(private titleService: TitleService, private activatedRouter: ActivatedRoute,
              private imageService: ImageService, private listService: ListService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.activatedRouter.data.subscribe((data) => {
          this.list = data['list'];
          this.generatePoster();
      });
      this.activatedRouter.params.subscribe((a) => {
          if (typeof a.mode !== 'undefined') {
              this.nav = a.mode;
          } else {
              this.nav = 'movies';
          }
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
