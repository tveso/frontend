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
  @Input() orientation = 'vertical';
  @Input() listable = true;
    movieTypes = [
        {
            'name' : 'Pendiente',
            'icon': 'hourglass_empty',
            'show': 'Pendiente',
            'tag': 'pending'
        },
        {
            'name': 'Vista',
            'icon': 'remove_red_eye',
            'show': 'Vista',
            'tag': 'watched',
        },
        {
            'name': 'Favorita',
            'icon': 'favorite',
            'show': 'Favorita',
            'tag': 'favorite'
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
            'name': 'Favorita',
            'icon': 'favorite',
            'show': 'Favorita',
            'tag': 'favorite'
        },
    ];
    listTypes = [
        {
            'name': 'Seguir',
            'show': 'Siguiendo',
            'icon': 'arrow_right_alt',
            'tag': 'following',
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
        switch (this.movie.type) {
            case 'movie':
                return this.movieTypes;
            case 'tvshow':
                return this.tvshowTypes;
            case 'list':
                return this.listTypes;
        }
    }
    getClass(tag) {
        const followed = this.doesFollow();
        const result = 'default ';
        if (followed === null) { return 'default'; }
        return (tag.tag === followed) ? 'activeMenuitem ' + tag.icon : result;

    }
    doesFollow() {
        if (typeof this.movie.userFollow === 'undefined' || this.movie.userFollow === null) {
            return null;
        }
        return this.movie.userFollow.mode;
    }
    follow(type) {
        let tag = type.tag;
        type = Object.assign({}, type);
        const follow = this.doesFollow();
        if (follow === type.tag && follow !== null ) {
            type.tag = 'cancel';
            tag = 'cancel';
        }
      this.frontFollow(type);
      this.followService.follow(this.movie._id, tag, this.movie.type).subscribe((a) => {
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
