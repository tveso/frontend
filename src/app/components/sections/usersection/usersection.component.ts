import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {MenuService} from '../../../services/menu.service';
import {FollowService} from '../../../services/follow.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../entities/user';
import {Observable, of, Subject} from 'rxjs';
import {SharedService} from '../../../entities/page.abstract';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-usersection',
  templateUrl: './usersection.component.html',
  styleUrls: ['./usersection.component.scss']
})
export class UsersectionComponent implements OnInit {
    public user: User;
    userMenu;

  constructor(public menuService: MenuService, private userService: UserService, private activatedRoite: ActivatedRoute, private ss: SharedService) { }

  ngOnInit() {
      this.ss.add(this.activatedRoite.data);
      this.activatedRoite.data.subscribe((a) => {
          this.user = new User(a.user);
          this.userMenu = this.menuService.getUserMenu(this.user.username);
      });
  }

}

@Component({
    selector: 'app-userprofile',
    templateUrl: './profile.component.html',
    styleUrls: ['./usersection.component.scss']
})
export class UserProfileComponent implements OnInit {
    private user: User;
    profileInfo;
    @ViewChild('imgAvatar') imgAvatar;

    constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private ss: SharedService) { }

    ngOnInit() {
        this.ss.observer.subscribe((a) => {
            this.user = new User(a.user);
            this.activatedRoute.data.subscribe((data) => {
                this.profileInfo = data.userInfo;
            });
        });
    }
    isLoggedUser(): boolean {
        return this.user.username === this.userService.getUser().username;
    }
    updateImage($event) {
        this.imgAvatar.nativeElement.src = $event;
    }
    avatarUpload(data) {
        this.userService.uploadAvatar(data).subscribe((a: any) => {
        });
    }

}

@Component({
    selector: 'app-usermovies',
    templateUrl: './movies.component.html',
    styleUrls: ['./usersection.component.scss']
})
export class UserMoviesComponent implements OnInit {
    callback: Function;
    private mode: any;
    private user: User;
    constructor(private followService: FollowService, private activatedRoute: ActivatedRoute, private ss: SharedService) { }

    ngOnInit() {
        this.callback = this.load.bind(this);
        this.ss.observer.subscribe((a) => {
            this.user = new User(a.user);
        });
    }
    setMode($event) {
        if (typeof $event.mode === 'undefined') {
            $event.mode = ['pending'];
        }
        this.mode = $event.mode;
    }

    load(params) {
        params.type = 'movie';
        params.user = this.user.id.$oid;
        return this.followService.all(params);
    }

    getCurrentMode() {
        const result = [];
        if (this.mode.indexOf('pending') > -1) {
            result.push('pendientes');
        }
        if (this.mode.indexOf('watched') > -1) {
            result.push('vistas');
        }
        if (this.mode.indexOf('favorite') > -1) {
            result.push('favoritas');
        }
        return result.join(', ');
     }

}

@Component({
    selector: 'app-usertvshows',
    templateUrl: './tvshows.component.html',
    styleUrls: ['./usersection.component.scss']
})
export class UserTvshowsComponent implements OnInit {
    callback: Function;
    mode;
    private user: User;
    constructor(private followService: FollowService, private activatedRoute: ActivatedRoute, private ss: SharedService) { }
    ngOnInit() {
        this.callback = this.load.bind(this);
        this.ss.observer.subscribe((a) => {
            this.user = new User(a.user);
        });
    }
    setMode($event) {
        if (typeof $event.mode === 'undefined') {
            $event.mode = ['following'];
        }
        this.mode = $event.mode;
    }
    load(params) {
        params.type = 'tvshow';
        params.user = this.user.id.$oid;
        return this.followService.all(params);
    }
    getCurrentMode() {
        const result = [];
        if (this.mode.indexOf('pending') > -1) {
            result.push('pendientes');
        }
        if (this.mode.indexOf('following') > -1) {
            result.push('que sigue');
        }
        if (this.mode.indexOf('finalized') > -1) {
            result.push('finalizadas');
        }
        if (this.mode.indexOf('favorite') > -1) {
            result.push('favoritas');
        }
        return result.join(', ');
    }


}
@Injectable()
export class UserLoggedResolver implements Resolve<any> {
    constructor(private userService: UserService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.userService.findByName(route.params.user);
    }
}
@Injectable()
export class UserProfileResolver implements Resolve<any> {
    constructor(private userService: UserService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.userService.getUserProfileInfo(route.parent.params.user);
    }
}
