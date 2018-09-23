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

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(public snackbar: MatSnackBar) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).do((event: HttpEvent<any>) => {}, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                this.snackbar.open('Hubo un error en la página, lo sentimos mucho :(', 'CERRAR');
            }
        });
    }
}
