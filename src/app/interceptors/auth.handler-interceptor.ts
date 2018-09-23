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

@Injectable({
    providedIn: 'root'
})
export class AuthHandlerInterceptor {

    constructor(private securityService: SecurityService, private router: Router, private activatedRouter: ActivatedRoute) {
        this.intercept();
    }

    private events: Map<number, Observable<Event>> = new Map();

    private intercept() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof ActivationEnd)) {
                return;
            }
            const role = evt.snapshot.data.needAuth;
            if (typeof role === 'undefined') {
                return;
            }
            if (!this.securityService.loggedIn()) {
                this.router.navigate(['/login']);
            }
            if (!(this.securityService.hasAccess(role))) {
                this.router.navigate(['/login']);
            }
        });
    }
}
