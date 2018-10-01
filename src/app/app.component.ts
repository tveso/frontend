import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd, NavigationEnd, Router, RouterStateSnapshot} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {TitleService} from './services/title.service';
import {ConfigService} from './services/config.service';
import {SecurityService} from './services/security.service';
import {AuthHandlerInterceptor} from './interceptors/auth.handler-interceptor';
import {RouterHandlerInterceptor} from './interceptors/router.handler-interceptor';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    dataLoaded = false;
    constructor(private router: Router, private _titleService: TitleService,
                protected configService: ConfigService, private authHandlerInterceptor: AuthHandlerInterceptor,
                public securityService: SecurityService, private routerHandlerInterceptor: RouterHandlerInterceptor ) { }

    ngOnInit() {
        this.configService.init().subscribe(null, null, () => {
            this.dataLoaded = true;

        });
    }
}
