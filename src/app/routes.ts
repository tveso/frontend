import {MovieInfoPageResolver} from './components/sections/moviepage/moviepageResolver';
import {
    SeasonComponent,
    TvImagesComponent,
    TvInfoComponent,
    TvshowpageComponent
} from './components/sections/tvshowpage/tvshowpage.component';
import {PageNotFoundComponent} from './components/sections/page-not-found/page-not-found.component';
import {PopularResolver} from './components/sections/welcome/WelcomeResolver';
import {WelcomeComponent} from './components/sections/welcome/welcome.component';
import {MoviepageComponent} from './components/sections/moviepage/moviepage.component';
import {TvShowInfoPageResolver} from './components/sections/tvshowpage/TvShowpageResolver';
import {MovielistComponent} from './components/sections/movielist/movielist.component';
import {TvshowlistComponent} from './components/sections/tvshowlist/tvshowlist.component';
import {SearchResultResolver, SearchResultsComponent} from './components/sections/search-results/search-results.component';
import {LoginComponent} from './components/sections/auth/login/login.component';
import {LogoutComponent} from './components/sections/auth/logout/logout.component';
import {RegisterComponent} from './components/sections/auth/register/register.component';
import {UserrecommendedComponent} from './components/sections/userrecommended/userrecommended.component';
import {AuthGuard} from './auth/auth.guard';
import {PeoplelistComponent} from './components/sections/peoplelist/peoplelist.component';
import {PersonpageComponent, PersonpageResolver} from './components/sections/personpage/personpage.component';

const RoutesList = [
    {path : '', canActivate: [AuthGuard], children: [
            { path: '', component: WelcomeComponent,  data: {title: 'Novedades', needAuth: 'ROLE_USER'}, resolve: {
                    popular: PopularResolver
                }
            },
            { path: 'home', component: WelcomeComponent,   data: {title: 'Novedades', needAuth: 'ROLE_USER'}, resolve: {
                    popular: PopularResolver
                }
            },
            {path: 'movies', component: MovielistComponent, data: {title: 'Películas', needAuth: 'ROLE_USER'}},
            {path: 'people', component: PeoplelistComponent, data: {title: 'Personas', needAuth: 'ROLE_USER'}},
            {path: 'search', component: SearchResultsComponent, data: {needAuth: 'ROLE_USER'}, resolve: {
                    results: SearchResultResolver
                }},
            {path: 'tvshows',  component: TvshowlistComponent, data: {title: 'Series',  needAuth: 'ROLE_USER'}},
            {path: 'recommendations',  component: UserrecommendedComponent,
                data: {title: 'Recomendaciones',  needAuth: 'ROLE_USER'}},
            {path: 'movie/:id', component: MoviepageComponent, resolve: {
                    show: MovieInfoPageResolver,
                }, data: { needAuth: 'ROLE_USER'}},
            {path: 'person/:id', component: PersonpageComponent, resolve: {
                    person: PersonpageResolver,
                }, data: { needAuth: 'ROLE_USER'}},
            {path: 'tvshow/:id', component: TvshowpageComponent,  resolve: {
                    show: TvShowInfoPageResolver},  data: { needAuth: 'ROLE_USER'}, children: [
                    {path: 'season', component: SeasonComponent
                    },
                    {path: '', component: TvInfoComponent
                    },
                    {path: 'recommended', component: TvInfoComponent},
                    {path: 'images', component: TvImagesComponent},
                ]},
            {path: 'login', component: LoginComponent, data: {title: 'Entrar'}},
            {path: 'register', component: RegisterComponent, data: {title: 'Registro'}},
            {path: 'logout', component: LogoutComponent, data: {needAuth: 'ROLE_USER'}},
            { path: '**', component: PageNotFoundComponent }
        ]}
];

export {RoutesList};
