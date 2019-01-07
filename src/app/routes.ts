import {PageNotFoundComponent} from './components/sections/page-not-found/page-not-found.component';
import {PopularResolver} from './components/sections/welcome/WelcomeResolver';
import {WelcomeComponent} from './components/sections/welcome/welcome.component';
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
import {
    SeasonComponent, ShowCastComponent,
    ShowpageComponent,
    TvImagesComponent,
    TvInfoComponent
} from './components/sections/showpage/showpage-component.service';
import {MovieInfoPageResolver, TvShowInfoPageResolver} from './components/sections/showpage/ShowPageResolver';
import {
    UserLoggedResolver,
    UserMoviesComponent,
    UserProfileComponent, UserProfileResolver,
    UsersectionComponent,
    UserTvshowsComponent
} from './components/sections/usersection/usersection.component';
import {
    CalendarMoviesComponent,
    CalendarsectionComponent,
    CalendarTvshowsComponent, MyCalendarComponent
} from './components/sections/calendarsection/calendarsection.component';
import {EpisodePageComponent, EpisodePageResolver} from './components/sections/episode-page/episode-page.component';
import {ListpageComponent, ListPageResolver} from './components/sections/listpage/listpage.component';
import {ListlistComponent} from './components/sections/listlist/listlist.component';
import {CreatelistComponent} from './components/sections/createlist/createlist.component';


const RoutesList = [
    {path : '', children: [
            { path: '', canActivate: [AuthGuard], component: WelcomeComponent,  data: {title: 'Novedades', needAuth: 'ROLE_USER'}, resolve: {
                    popular: PopularResolver
                }
            },
            { path: 'home',  canActivate: [AuthGuard], component: WelcomeComponent,   data: {title: 'Novedades', needAuth: 'ROLE_USER'}, resolve: {
                    popular: PopularResolver
                }
            },
            {path: 'movies', canActivate: [AuthGuard],  component: MovielistComponent, data: {title: 'Películas', needAuth: 'ROLE_USER'}},
            {path: 'lists', canActivate: [AuthGuard],  component: ListlistComponent, data: {title: 'Listas', needAuth: 'ROLE_USER'}},
            {path: 'lists/create', canActivate: [AuthGuard],  component: CreatelistComponent, data: {title: 'Crear Lista', needAuth: 'ROLE_USER'}},
            {path: 'people',  canActivate: [AuthGuard], component: PeoplelistComponent, data: {title: 'Personas', needAuth: 'ROLE_USER'}},
            {path: 'search',  canActivate: [AuthGuard], component: SearchResultsComponent,
                data: {needAuth: 'ROLE_USER'}, resolve: {
                    results: SearchResultResolver
                }},
            {path: 'tvshows',   canActivate: [AuthGuard],  component: TvshowlistComponent, data: {title: 'Series',  needAuth: 'ROLE_USER'}},
            {path: 'recommendations',   canActivate: [AuthGuard],  component: UserrecommendedComponent,
                data: {title: 'Recomendaciones',  needAuth: 'ROLE_USER'}},
            {path: 'calendar',   canActivate: [AuthGuard],  component: CalendarsectionComponent,
                data: {title: 'Calendario',  needAuth: 'ROLE_USER'}, children: [
                    {path: '', redirectTo: '/calendar/mycalendar',  pathMatch: 'full'},
                    {path: 'movies', component: CalendarMoviesComponent,  canActivate: [AuthGuard],
                        data: { title: 'Calendario de estrenos de Películas', needAuth: 'ROLE_USER'}},
                    {path: 'mycalendar', component: MyCalendarComponent,  canActivate: [AuthGuard],
                        data: { title: 'Mi calendario', needAuth: 'ROLE_USER'}},
                    {path: 'tvshows', component: CalendarTvshowsComponent,  canActivate: [AuthGuard],
                        data: { title: 'Calendario de estrenos de Series', needAuth: 'ROLE_USER'}},
                ]},
            {path: 'movie/:name/:id', component: ShowpageComponent,   canActivate: [AuthGuard],  resolve: {
                    show: MovieInfoPageResolver},  data: { needAuth: 'ROLE_USER'}, children: [
                    {path: '', component: TvInfoComponent
                    },
                    {path: 'recommended', component: TvInfoComponent},
                    {path: 'images', component: TvImagesComponent},
                    {path: 'cast', component: ShowCastComponent}
                ]},
            {path: 'person/:id', component: PersonpageComponent,   canActivate: [AuthGuard], resolve: {
                    person: PersonpageResolver,
                }, data: { needAuth: 'ROLE_USER'}},
            {path: 'tvshow/:name/:id', component: ShowpageComponent,  canActivate: [AuthGuard],   resolve: {
                    show: TvShowInfoPageResolver},  data: { needAuth: 'ROLE_USER'}, children: [
                    {path: 'season', component: SeasonComponent
                    },
                    {path: '', component: TvInfoComponent
                    },
                    {path: 'recommended', component: TvInfoComponent},
                    {path: 'images', component: TvImagesComponent},
                    {path: 'cast', component: ShowCastComponent}
                ]},
            {path: 'user/:user', component: UsersectionComponent, resolve: {user: UserLoggedResolver},   canActivate: [AuthGuard],  data: { needAuth: 'ROLE_USER'}, children: [
                    {path: '', redirectTo: 'profile', pathMatch: 'full'},
                    {path: 'profile', component: UserProfileComponent, resolve: {userInfo: UserProfileResolver},  data: {title: 'Perfil de usuario'}},
                    {path: 'movies', component: UserMoviesComponent,   data: {title: 'Películas'}},
                    {path: 'tvshows', component: UserTvshowsComponent,  data: {title: 'Series'}},
                ]},
            {path: 'episode/:id', component: EpisodePageComponent,  canActivate: [AuthGuard],   resolve: {
                    episode: EpisodePageResolver},  data: { needAuth: 'ROLE_USER'}, children: [
                ]},
            {path: 'list/:name/:id', component: ListpageComponent, resolve: {list: ListPageResolver},   canActivate: [AuthGuard],
                data: {needAuth: 'ROLE_USER'}},
            {path: 'list/:name/:id/:mode', component: ListpageComponent, resolve: {list: ListPageResolver},   canActivate: [AuthGuard],
                data: {needAuth: 'ROLE_USER'}},
            {path: 'login', component: LoginComponent, data: {title: 'Entrar'}},
            {path: 'register', component: RegisterComponent, data: {title: 'Registro'}},
            {path: 'logout', component: LogoutComponent,  canActivate: [AuthGuard],  data: {needAuth: 'ROLE_USER'}},
            { path: '**', component: PageNotFoundComponent }
        ]}
];

export {RoutesList};
