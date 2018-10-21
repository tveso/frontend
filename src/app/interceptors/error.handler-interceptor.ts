import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';

import {MatSnackBar} from '@angular/material';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, retryWhen} from 'rxjs/operators';

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
                    if ( [500, 501, 502, 503, 504].indexOf(err.status) > -1 && counter < 1) {
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
