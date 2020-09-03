import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request Sent');
        const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')})
        return next.handle(modifiedRequest).pipe(tap((event) => {
            console.log("intercepted:");
            console.log(event);
        }));
    }
}