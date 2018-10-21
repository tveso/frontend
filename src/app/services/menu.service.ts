import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public main =
      [
          {link: 'movies', name: 'Películas', icon: 'movie'},
          {link: 'tvshows', name: 'Series', icon: 'tv'},
          {link: 'people', name: 'Personas', icon: 'people'},
          {link: 'recommendations', name: 'Recomendaciones', icon: 'thumb_up'},
      ];
  public user =
      [
          {link: 'user/profile', name: 'Perfil', icon: 'account_box'},
          {link: 'user/movies', name: 'Películas', icon: 'movie'},
          {link: 'user/tvshows', name: 'Series', icon: 'tv'},
          {link: 'user/following', name: 'Seguidores', icon: 'people'},
          {link: 'user/followed', name: 'Seguidos', icon: 'people_outline'},
          {link: '/logout', name: 'Salir', icon: 'exit_to_app'},
      ];
  constructor() { }

  getMainMenu() {

  }
}
