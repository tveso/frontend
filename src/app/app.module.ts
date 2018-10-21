import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/structure/header/header.component';
import {FooterComponent} from './components/structure/footer/footer.component';
import {PageNotFoundComponent} from './components/sections/page-not-found/page-not-found.component';
import {DialogEpisodeToWatchComponent, WelcomeComponent} from './components/sections/welcome/welcome.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TmdbimageComponent} from './components/models/tmdbimage/tmdbimage.component';
import {MovieitemComponent} from './components/models/movieitem/movieitem.component';
import {SearchboxComponent} from './components/structure/searchbox/searchbox.component';
import {MovienamePipe} from './pipes/moviename.pipe';
import {RequestCache, RequestCacheWithMap} from './services/request-cache.service';
import {MessageService} from './services/message.service';
import {SidebarComponent} from './components/structure/sidebar/sidebar.component';
import {ListMoviesCompressComponent} from './components/models/list-movies-compress/list-movies-compress.component';
import {TypeOfShowPipe} from './pipes/type-of-show.pipe';
import {SpinnerComponent} from './components/utils/spinner/spinner.component';
import {MoviepageComponent} from './components/sections/moviepage/moviepage.component';
import {MovieInfoPageResolver} from './components/sections/moviepage/moviepageResolver';
import {GenreComponent} from './components/models/genre/genre.component';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {PopularResolver} from './components/sections/welcome/WelcomeResolver';
import {
    SeasonComponent,
    TvImagesComponent,
    TvInfoComponent,
    TvshowpageComponent
} from './components/sections/tvshowpage/tvshowpage.component';
import {TvShowInfoPageResolver} from './components/sections/tvshowpage/TvShowpageResolver';
import {RoutesList} from './routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReadmoreComponent} from './components/utils/readmore/readmore.component';
import {MovielistComponent} from './components/sections/movielist/movielist.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ErrorHandlerInterceptor} from './interceptors/error.handler-interceptor';
import {TvshowlistComponent} from './components/sections/tvshowlist/tvshowlist.component';
import {MaterialModule} from './modules/material.module';
import {SearchResultResolver, SearchResultsComponent} from './components/sections/search-results/search-results.component';
import {ListnavbarComponent} from './components/sections/movielist/listnavbar/listnavbar.component';
import {LinksComponent} from './components/models/links/links.component';
import {TvshowepisodeComponent} from './components/models/tvshowepisode/tvshowepisode.component';
import {LoginComponent} from './components/sections/auth/login/login.component';
import {CookieService} from 'ngx-cookie-service';
import {HomeComponent} from './components/sections/home/home.component';
import {CalendarComponent} from './components/utils/calendar/calendar.component';
import {YoutubeComponent} from './components/models/youtube/youtube.component';
import {FollowComponent} from './components/models/follow/follow.component';
import {LoadingComponent} from './components/sections/loading/loading.component';
import {MarkdownModule, MarkedOptions} from 'ngx-markdown';
import {CovalentTextEditorModule} from '@covalent/text-editor';
import {TimeagoPipe} from './pipes/timeago.pipe';
import {ConfirmDialogComponent} from './components/utils/confirm-dialog/confirm-dialog.component';
import {ExtraMdTagsPipe} from './pipes/extra-md-tags.pipe';
import {ContentLoaderModule} from '@netbasal/content-loader';
import {RatingComponent} from './components/models/rating/rating.component';
import {WINDOW_PROVIDERS} from './provider/windowProvider';
import {AuthServiceConfig, GoogleLoginProvider, SocialLoginModule} from 'angular-6-social-login-v2';
import {LogoutComponent} from './components/sections/auth/logout/logout.component';
import {RegisterComponent} from './components/sections/auth/register/register.component';
import {UserrecommendedComponent} from './components/sections/userrecommended/userrecommended.component';
import {ShowRecommendedComponent} from './components/models/show-recommended/show-recommended.component';
import {PeoplelistComponent} from './components/sections/peoplelist/peoplelist.component';
import {CommentSectionComponent} from './components/models/comment-section/comment-section.component';
import {CommentComponent} from './components/models/comment-section/comment/comment.component';
import {SpoilerComponent} from './components/models/comment-section/spoiler/spoiler.component';
import {PersonitemComponent} from './components/models/personitem/personitem.component';
import {ItemlistComponent} from './components/utils/itemlist/itemlist.component';
import {PlaceholderitemsComponent} from './components/utils/placeholderitems/placeholderitems.component';
import {PersonpageComponent, PersonpageResolver} from './components/sections/personpage/personpage.component';


// Configs
export function getAuthServiceConfigs() {
    return new AuthServiceConfig(
        [
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('385993528675-4sdm72329lifoqfttc19herj16g8glu1.apps.googleusercontent.com')
            },
        ]
    );
}

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
      DialogEpisodeToWatchComponent,
      TvImagesComponent,
      FollowComponent,
      CommentSectionComponent,
      LoadingComponent,
      TimeagoPipe,
      CommentComponent,
      ConfirmDialogComponent,
      ExtraMdTagsPipe,
      SpoilerComponent,
      RatingComponent,
      LogoutComponent,
      RegisterComponent,
      UserrecommendedComponent,
      ShowRecommendedComponent,
      PeoplelistComponent,
      PersonitemComponent,
      ItemlistComponent,
      PlaceholderitemsComponent,
      PersonpageComponent,
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      ContentLoaderModule,
      LoadingBarRouterModule,
      BrowserAnimationsModule,
      MaterialModule,
      CovalentTextEditorModule,
      InfiniteScrollModule,
      SocialLoginModule,
      MarkdownModule.forRoot({
          markedOptions: {
              provide: MarkedOptions,
              useValue: {
                  sanitize: true,
              },
          },
      }),
      RouterModule.forRoot(
          appRoutes,
          { enableTracing: false }
      )
  ],
  providers: [
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
      PersonpageResolver,
      CookieService,
      WINDOW_PROVIDERS,
      {
          provide: AuthServiceConfig,
          useFactory: getAuthServiceConfigs
      }
  ],
  bootstrap: [AppComponent],
    entryComponents: [LinksComponent, DialogEpisodeToWatchComponent, ConfirmDialogComponent, SpinnerComponent, ShowRecommendedComponent]
})

export class AppModule { }
