import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {DialogEpisodeToWatchComponent, WelcomeComponent} from './components/welcome/welcome.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TmdbimageComponent } from './components/tmdbimage/tmdbimage.component';
import { MovieitemComponent } from './components/movieitem/movieitem.component';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { MovienamePipe } from './pipes/moviename.pipe';
import {CachingInterceptor} from './interceptors/caching-interceptor';
import {RequestCache, RequestCacheWithMap} from './services/request-cache.service';
import {MessageService} from './services/message.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {ListMoviesCompressComponent} from './components/list-movies-compress/list-movies-compress.component';
import { TypeOfShowPipe } from './pipes/type-of-show.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MoviepageComponent } from './components/moviepage/moviepage.component';
import {MovieInfoPageResolver} from './components/moviepage/moviepageResolver';
import { GenreComponent } from './components/genre/genre.component';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {PopularResolver} from './components/welcome/WelcomeResolver';
import {SeasonComponent, TvInfoComponent, TvshowpageComponent} from './components/tvshowpage/tvshowpage.component';
import {TvShowInfoPageResolver} from './components/tvshowpage/TvShowpageResolver';
import {RoutesList} from './routes';
import {Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReadmoreComponent } from './components/utils/readmore/readmore.component';
import { MovielistComponent } from './components/movielist/movielist.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ErrorHandlerInterceptor} from './interceptors/error.handler-interceptor';
import { TvshowlistComponent } from './components/tvshowlist/tvshowlist.component';
import {MaterialModule} from './modules/material.module';
import {SearchResultResolver, SearchResultsComponent} from './components/search-results/search-results.component';
import { ListnavbarComponent } from './components/movielist/listnavbar/listnavbar.component';
import {LinksComponent} from './components/links/links.component';
import {TvshowepisodeComponent} from './components/tvshowepisode/tvshowepisode.component';
import { LoginComponent } from './components/login/login.component';
import {CookieService} from 'ngx-cookie-service';
import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { YoutubeComponent } from './components/youtube/youtube.component';



const appRoutes: Routes = RoutesList;


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    WelcomeComponent,
      ListMoviesCompressComponent,
    TmdbimageComponent,
    MovieitemComponent,
    SearchboxComponent,
    MovienamePipe,
    SidebarComponent,
    TypeOfShowPipe,
    SpinnerComponent,
      MoviepageComponent,
      GenreComponent,
      TvshowpageComponent,
      SeasonComponent,
      TvInfoComponent,
      ReadmoreComponent,
      MovielistComponent,
      TvshowlistComponent,
      SearchResultsComponent,
      ListnavbarComponent,
      LinksComponent,
      TvshowepisodeComponent,
      LoginComponent,
      HomeComponent,
      CalendarComponent,
      YoutubeComponent,
      DialogEpisodeToWatchComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      LoadingBarRouterModule,
      BrowserAnimationsModule,
      MaterialModule,
      InfiniteScrollModule,
      RouterModule.forRoot(
          appRoutes,
          { enableTracing: false }
      )
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
          useClass: CachingInterceptor,
          multi: true
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorHandlerInterceptor,
          multi: true
      },
      { provide: RequestCache, useClass: RequestCacheWithMap },
      MessageService,
      MovieInfoPageResolver,
      PopularResolver,
      TvShowInfoPageResolver,
      SearchResultResolver,
      CookieService
  ],
  bootstrap: [AppComponent],
    entryComponents: [LinksComponent, DialogEpisodeToWatchComponent]
})

export class AppModule { }
