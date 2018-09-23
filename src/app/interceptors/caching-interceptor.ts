import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/internal/operators';
import {RequestCache} from '../services/request-cache.service';


@Injectable()
export class CachingInterceptor implements HttpInterceptor {
    constructor(private cache: RequestCache) {}
    isCachable(request: HttpRequest<any>) {
        return request.method === 'GET' && !request.headers.has('Non-Cachable');
    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // continue if not cachable.
        if (!this.isCachable(req)) { return next.handle(req); }
        const cachedResponse = this.cache.get(req);
        return cachedResponse ?
            of(cachedResponse) : this.sendRequest(req, next, this.cache);
    }

    sendRequest(
        req: HttpRequest<any>,
        next: HttpHandler,
        cache: RequestCache): Observable<HttpEvent<any>> {

        // No headers allowed in npm search request
        const noHeaderReq = req.clone({ headers: new HttpHeaders() });

        return next.handle(noHeaderReq).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    cache.put(req, event); // Update the cache.
                }
            })
        );
    }
}