import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {MatSnackBar} from '@angular/material';
import {SecurityService} from '../services/security.service';
import {ActivatedRoute, ActivationEnd, Router} from '@angular/router';
import {TitleService} from '../services/title.service';

@Injectable({
    providedIn: 'root'
})
export class RouterHandlerInterceptor {

    constructor(private securityService: SecurityService, private router: Router, private activatedRouter: ActivatedRoute,
                private titleService: TitleService) {
        this.intercept();
    }

    private events: Map<number, Observable<Event>> = new Map();

    private intercept() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof ActivationEnd)) {
                return;
            }
            if (!(evt instanceof ActivationEnd)) {
                return;
            }
            const title = evt.snapshot.data.title;
            if ( typeof title !== 'undefined' ) {
                this.titleService.setTitle(title);
            }
        });
    }
}
