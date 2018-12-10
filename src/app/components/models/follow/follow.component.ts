import {Component, Input, OnInit} from '@angular/core';

import {MatSnackBar} from '@angular/material';
import {FollowService} from '../../../services/follow.service';
import {UtilService} from '../../../services/util.service';
import {UserService} from '../../../services/user.service';
import {CacheProxyService} from '../../../services/cache-proxy.service';
import {EventsService} from '../../../services/events.service';
import {Movie} from '../../../entities/movie';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit {
  @Input() movie: Movie;
    movieTypes = [
        {
            'name' : 'Pendiente',
            'icon': 'hourglass_empty',
            'show': 'Pendiente',
            'tag': 'pending'
        },
        {
            'name': 'Vista',
            'icon': 'done',
            'show': 'Vista',
            'tag': 'watched',
        },
        {
            'name': 'Favorita',
            'icon': 'favorite',
            'show': 'Favorita',
            'tag': 'favorite'
        },
        {
            'name': 'Cancelar',
            'icon': 'cancel',
            'tag': 'cancel'
        },
        ];
    tvshowTypes = [
        {
            'name' : 'Pendiente',
            'icon': 'hourglass_empty',
            'show': 'Pendiente',
            'tag': 'pending'
        },
        {
            'name': 'Seguir',
            'show': 'Siguiendo',
            'icon': 'arrow_right_alt',
            'tag': 'following',
        },
        {
            'name': 'Finalizar',
            'show': 'Finalizada',
            'icon': 'done',
            'tag': 'finalized',
        },
        {
            'name': 'Favorita',
            'icon': 'favorite',
            'show': 'Favorita',
            'tag': 'favorite'
        },
        {
            'name': 'Cancelar',
            'icon': 'cancel',
            'tag': 'cancel'
        },
    ];

    constructor(public utilService: UtilService, private userService: UserService, private followService: FollowService,
                public snackbar: MatSnackBar, private cacheProxyService: CacheProxyService, private eventsService: EventsService) { }

  ngOnInit() {
      const eventEmitter = this.eventsService.listen(`follow_${this.movie._id}`);
      eventEmitter.subscribe((a) => {
            this.frontFollow(a);
        });
  }

    getTypes() {
        const result = [];
        if (this.movie.type === 'movie') {
            return this.movieTypes;
        }
        return this.tvshowTypes;
    }
    getClass(tag) {
        const followed = this.doesFollow();
        const result = 'mat-menu-item ';
        if (followed === null) { return 'mat-menu-item'; }
        return (tag.tag === followed) ? result + 'activeMenuitem' : result;

    }
    doesFollow() {
        if (typeof this.movie.userFollow === 'undefined' || this.movie.userFollow === null) {
            return null;
        }
        return this.movie.userFollow.mode;
    }
    follow(type) {
        const follow = this.doesFollow();
        if (follow === type.tag ) {
            return;
        }
      this.frontFollow(type);
      const tag = type.tag;
      const typeName = type.name;
      const user = this.userService.getUser();
      const name = (typeof this.movie.name !== 'undefined') ? this.movie.name : this.movie.title;
      this.followService.follow(this.movie._id, tag, this.movie.type).subscribe((a) => {
          if (tag === 'cancel') {
              this.snackbar.open(`${name} ha sido quitada de la lista de seguimiento`, 'CERRAR', {duration: 2000});
              return;
          }
          this.snackbar.open(`${name} ha sido añadida a la lista '${typeName}'`, 'CERRAR', {duration: 2000});
      });
    }

    getUserCurrentTag() {
        const follow = this.doesFollow();
        if (follow === null ) {
            return {icon: 'menu', name: 'Seguir', show: 'Seguir'};
        }
        const types = (this.movie.type === 'movie') ? this.movieTypes : this.tvshowTypes;
        return types.find((a) => {
            return a.tag === follow;
        });
    }

    private frontFollow(type) {
        const tag = type.tag;
        if (tag === 'cancel') {
            this.movie.userFollow = null;
            return;
        }
        this.movie.userFollow = {};
        this.movie.userFollow.mode = tag;
        this.cacheProxyService.update(this.movie._id, this.movie);
    }
}
