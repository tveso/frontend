import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/structure/header/header.component';
import {FooterComponent} from './components/structure/footer/footer.component';
import {PageNotFoundComponent} from './components/sections/page-not-found/page-not-found.component';
import { WelcomeComponent} from './components/sections/welcome/welcome.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TmdbimageComponent} from './components/models/tmdbimage/tmdbimage.component';
import {MovieitemComponent} from './components/models/movieitem/movieitem.component';
import {SearchboxComponent} from './components/structure/searchbox/searchbox.component';
import {MovienamePipe} from './pipes/moviename.pipe';
import {RequestCache, RequestCacheWithMap} from './services/request-cache.service';
import {MessageService} from './services/message.service';
import {SidebarComponent} from './components/structure/sidebar/sidebar.component';
import {TypeOfShowPipe} from './pipes/type-of-show.pipe';
import {SpinnerComponent} from './components/utils/spinner/spinner.component';
import {GenreComponent} from './components/models/genre/genre.component';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import {PopularResolver} from './components/sections/welcome/WelcomeResolver';
import {RoutesList} from './routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReadmoreComponent} from './components/utils/readmore/readmore.component';
import {MovielistComponent} from './components/sections/movielist/movielist.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ErrorHandlerInterceptor, MyErrorHandler} from './interceptors/error.handler-interceptor';
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
import { SafePipe } from './pipes/safe.pipe';
import { RandomPipe } from './pipes/random.pipe';
import { ShowSelectorComponent } from './components/utils/show-selector/show-selector.component';
import { ItembadgeComponent } from './components/models/itembadge/itembadge.component';
import {
    SeasonComponent, ShowCastComponent,
    ShowpageComponent,
    TvImagesComponent,
    TvInfoComponent
} from './components/sections/showpage/showpage-component.service';
import {MovieInfoPageResolver, TvShowInfoPageResolver} from './components/sections/showpage/ShowPageResolver';
import { ItemsComponent } from './components/models/items/items.component';
import {
    UserLoggedResolver,
    UserMoviesComponent,
    UserProfileComponent, UserProfileResolver,
    UsersectionComponent,
    UserTvshowsComponent
} from './components/sections/usersection/usersection.component';
import { UploadfileComponent } from './components/utils/uploadfile/uploadfile.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ScrollDirective } from './directives/scroll.directive';
import {
    CalendarMoviesComponent,
    CalendarsectionComponent,
    CalendarTvshowsComponent, MyCalendarComponent
} from './components/sections/calendarsection/calendarsection.component';
import localeEs from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
import {EpisodePageComponent, EpisodePageResolver} from './components/sections/episode-page/episode-page.component';
import { EpisodenumberPipe } from './pipes/episodenumber.pipe';
import { EpiosodescalendarComponent } from './components/models/epiosodescalendar/epiosodescalendar.component';
import { EpisodeRatingComponent } from './components/models/rating/episode-rating/episode-rating.component';
import { ListitemComponent } from './components/models/listitem/listitem.component';
import {ListpageComponent, ListPageResolver} from './components/sections/listpage/listpage.component';
import { ListlistComponent } from './components/sections/listlist/listlist.component';
import { CreatelistComponent } from './components/sections/createlist/createlist.component';
import { TagsComponent } from './components/utils/tags/tags.component';
import {FilterPipeModule} from 'ngx-filter-pipe';
import { PersonSelectorComponent } from './components/utils/person-selector/person-selector.component';
import { EpisodeSelectorComponent } from './components/utils/episode-selector/episode-selector.component';
registerLocaleData(localeEs, 'es');
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
      TmdbimageComponent,
      MovieitemComponent,
      SearchboxComponent,
      MovienamePipe,
      SidebarComponent,
      TypeOfShowPipe,
      SpinnerComponent,
      GenreComponent,
      ShowpageComponent,
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
      TvImagesComponent,
      FollowComponent,
      CommentSectionComponent,
      LoadingComponent,
      TimeagoPipe,
      CommentComponent,
      ConfirmDialogComponent,
      ExtraMdTagsPipe,
      SpoilerComponent,
      ShowCastComponent,
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
      SafePipe,
      RandomPipe,
      ShowSelectorComponent,
      ItembadgeComponent,
      MyCalendarComponent,
      ItemsComponent,
      UsersectionComponent,
      UserProfileComponent,
      UserMoviesComponent,
      UserTvshowsComponent,
      UploadfileComponent,
      CapitalizePipe,
      ScrollDirective,
      CalendarsectionComponent,
      CalendarMoviesComponent,
      CalendarTvshowsComponent,
      EpisodePageComponent,
      EpisodenumberPipe,
      EpiosodescalendarComponent,
      EpisodeRatingComponent,
      ListitemComponent,
      ListpageComponent,
      ListlistComponent,
      CreatelistComponent,
      TagsComponent,
      PersonSelectorComponent,
      EpisodeSelectorComponent,
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      ContentLoaderModule,
      LoadingBarRouterModule,
      LoadingBarHttpClientModule,
      BrowserAnimationsModule,
      MaterialModule,
      FilterPipeModule,
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
          { enableTracing: false,  useHash: false, anchorScrolling: 'enabled'}
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
      UserLoggedResolver,
      UserProfileResolver,
      EpisodePageResolver,
      ListPageResolver,
      CookieService,
      {provide: ErrorHandler, useClass: MyErrorHandler},
      WINDOW_PROVIDERS,
      {
          provide: AuthServiceConfig,
          useFactory: getAuthServiceConfigs
      },
  ],
  bootstrap: [AppComponent],
    entryComponents: [LinksComponent,  SpinnerComponent, ShowRecommendedComponent, ConfirmDialogComponent, CreatelistComponent]
})

export class AppModule { }
