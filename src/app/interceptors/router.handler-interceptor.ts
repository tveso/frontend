import {Injectable} from '@angular/core';
import {SecurityService} from '../services/security.service';
import {ActivatedRoute, ActivationEnd, Router} from '@angular/router';
import {TitleService} from '../services/title.service';
import {EventsService} from '../services/events.service';

@Injectable({
    providedIn: 'root'
})
export class RouterHandlerInterceptor {

    constructor(private securityService: SecurityService, private router: Router, private activatedRouter: ActivatedRoute,
                private titleService: TitleService, private eventsService: EventsService) {
        this.intercept();
    }

    private intercept() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof ActivationEnd)) {
                return;
            }
            this.eventsService.clearEvents();
            const title = evt.snapshot.data.title;
            if ( typeof title !== 'undefined' ) {
                this.titleService.setTitle(title);
            }
        });
    }
}
