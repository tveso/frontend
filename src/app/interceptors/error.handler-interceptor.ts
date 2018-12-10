import {ErrorHandler, Inject, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';

import {MatSnackBar} from '@angular/material';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, retryWhen} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(public snackbar: MatSnackBar, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError((a) => {
                return throwError(a);
            }));
    }
}

@Injectable()
export class MyErrorHandler implements ErrorHandler {
    private router: Router;
    private matsnack: MatSnackBar;
    private isOpened = false;
    constructor( private injector: Injector) {
    }
    handleError(error) {
        console.error(error);
        this.matsnack = this.injector.get(MatSnackBar);
        if (!this.isOpened) {
            this.isOpened = true;
            this.matsnack.open('Ha ocurrido un error, sentimos las molestias.', 'REINTENTAR', {
                duration: 3000
            }).onAction().subscribe(() => {
                location.reload();
                this.isOpened = false;
            });
        }
    }
}
