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
import {catchError, retry, retryWhen, tap} from 'rxjs/operators';
import {interval, of, pipe, Subject, throwError} from 'rxjs';
import {flatMap} from 'rxjs/internal/operators';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(public snackbar: MatSnackBar) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError((a) => {
                this.showMessage(a);
                return throwError(a);
            }),
            retryWhen((errors) => {
                const result = new Subject();
                let counter = 0;
                errors.subscribe((err) => {
                    ++counter;
                    if ( [500, 501, 502, 503, 504].indexOf(err.status) > -1 && counter < 5) {
                        result.next(err);
                    } else {
                        result.error(err);
                    }
                });
                return result;
            }));
    }

    private showMessage(err: any) {
    if (err instanceof HttpErrorResponse) {
        if ( [500, 501, 502, 503, 504].indexOf(err.status) > -1) {
            this.snackbar.open('Hubo un error en la página, estamos intentado arreglarlo...', 'CERRAR',
                {duration: 3000});
        }
    }
    }
}
