import {Injectable} from '@angular/core';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public main =
      [
          {link: 'movies', name: 'Películas', icon: 'movie'},
          {link: 'tvshows', name: 'Series', icon: 'tv'},
          {link: 'people', name: 'Personas', icon: 'people'},
          {link: 'calendar', name: 'Calendario', icon: 'calendar_today'},
          {link: 'lists', name: 'Listas', icon: 'list'},
          {link: 'recommendations', name: 'Recomendaciones', icon: 'thumb_up'},
      ];
  public user =
      [
          {link: 'user/profile', name: 'Perfil', icon: 'account_box'},
          {link: 'user/movies', name: 'Películas', icon: 'movie'},
          {link: 'user/tvshows', name: 'Series', icon: 'tv'},
          {link: 'user/friends', name: 'Amigos', icon: 'people_outline'},
          {link: 'user/lists', name: 'Listas', icon: 'list'},
          {link: '/logout', name: 'Salir', icon: 'exit_to_app'},
      ];
  constructor(private userService: UserService) { }

  getUserMenu(username) {
      username = username.toLowerCase();
      if (typeof username === 'undefined') {
          username = this.userService.getUser().username;
      }
      const result =    [
          {link: `user/${username}/profile`, name: 'Perfil', icon: 'account_box'},
          {link: `user/${username}/movies`, name: 'Películas', icon: 'movie'},
          {link: `user/${username}/tvshows`, name: 'Series', icon: 'tv'},
          {link: `user/${username}/lists`, name: 'Listas', icon: 'list'},
          {link: `user/${username}/friends`, name: 'Amigos', icon: 'people_outline'},
      ];
      if (this.userService.getUser().username === username) {
          result.push({link: `/logout`, name: 'Salir', icon: 'exit_to_app'});
      }
      return result;
  }
}
