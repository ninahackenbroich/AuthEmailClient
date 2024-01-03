import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable()

export class AuthHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      withCredentials: true
    });
    return next.handle(modifiedReq).pipe(
      tap((val) => {
        if (val.type === HttpEventType.Sent) {
          console.log("request was sent to server");
        }

        if (val.type === HttpEventType.Response) {
          console.log("got a response from the API", val);
        }

        console.log("interceptor");
      }))
  }
}
