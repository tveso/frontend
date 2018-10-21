import {Injectable} from '@angular/core';
import {SecurityService} from './security.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private securityService: SecurityService, private http: HttpClient) { }

  getUser() {
    return this.securityService.user;
  }

  doesFollowTvshow(id) {
    const followedTvshows = this.getUser().data.tvshows.following;
    for (const i in followedTvshows) {
      if (i === id) {
        return followedTvshows[i];
      }
    }

    return null;
  }
  doesFollowMovie(id) {
      const followedMovie = this.getUser().data.movies.following;
      for (const i in followedMovie) {
          if (i === id) {
              return followedMovie[i];
          }
      }

      return null;
  }

  getUserName() {
      const name = this.getUser().username;
      return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
