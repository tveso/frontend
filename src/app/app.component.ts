
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ConfigService} from './services/config.service';
import {SecurityService} from './services/security.service';
import {
    ActivatedRoute,
    ActivationEnd, Data,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router,
    RouterEvent
} from '@angular/router';
import {MatDialog} from '@angular/material';
import {TitleService} from './services/title.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    dataLoaded = false;
    private loading = false;
    constructor(private router: Router, protected configService: ConfigService,
                public securityService: SecurityService, private activatedRoute: ActivatedRoute, private dialogRef: MatDialog,
                private titleService: TitleService) {
    }
    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.dialogRef.closeAll();
            this.loading = true;
        }
        if (event instanceof NavigationEnd) {
            this.loading = false;
        }
        if (event instanceof ActivationEnd) {
            this.changeTitle(event.snapshot.data);
        }
        if (event instanceof NavigationCancel) {
            this.loading = false;
        }
        if (event instanceof NavigationError) {
            this.loading = false;
        }
    }

    ngOnInit() {
        this.configService.init().subscribe(null, null, () => {
            this.dataLoaded = true;
        });
        this.router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });
    }

    private changeTitle(data: Data) {
        if (typeof  data.title !== 'undefined') {
            this.titleService.setTitle(data.title);
        }
    }
}
