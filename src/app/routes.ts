import {MovieInfoPageResolver} from './components/moviepage/moviepageResolver';
import {SeasonComponent, TvImagesComponent, TvInfoComponent, TvshowpageComponent} from './components/tvshowpage/tvshowpage.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {PopularResolver} from './components/welcome/WelcomeResolver';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {MoviepageComponent} from './components/moviepage/moviepage.component';
import {TvShowInfoPageResolver} from './components/tvshowpage/TvShowpageResolver';
import {Routes} from '@angular/router';
import {MovielistComponent} from './components/movielist/movielist.component';
import {TvshowlistComponent} from './components/tvshowlist/tvshowlist.component';
import {SearchResultResolver, SearchResultsComponent} from './components/search-results/search-results.component';
import {LoginComponent} from './components/login/login.component';

const RoutesList = [
    { path: '', component: WelcomeComponent,  data: {title: 'Novedades', needAuth: 'ROLE_USER'}, resolve: {
            popular: PopularResolver
        }
    },
    { path: 'home', component: WelcomeComponent,  data: {title: 'Novedades', needAuth: 'ROLE_USER'}, resolve: {
            popular: PopularResolver
        }
    },
    {path: 'movies', component: MovielistComponent, data: {title: 'Películas', needAuth: 'ROLE_USER'}},
    {path: 'search', component: SearchResultsComponent, data: {needAuth: 'ROLE_USER'}, resolve: {
        results: SearchResultResolver
        }},
    {path: 'tvshows', component: TvshowlistComponent, data: {title: 'Series',  needAuth: 'ROLE_USER'}},
    {path: 'movie/:id', component: MoviepageComponent, resolve: {
            movies: MovieInfoPageResolver,
        }, data: { needAuth: 'ROLE_USER'}},
    {path: 'tvshow/:id', component: TvshowpageComponent, resolve: {
            tvshows: TvShowInfoPageResolver},  data: { needAuth: 'ROLE_USER'}, children: [
            {path: 'season', component: SeasonComponent
            },
            {path: '', component: TvInfoComponent
            },
            {path: 'images', component: TvImagesComponent},
            ]},
    {path: 'login', component: LoginComponent, data: {title: 'Login'}},
    { path: '**', component: PageNotFoundComponent },
];

export {RoutesList};
