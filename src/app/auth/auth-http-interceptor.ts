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
      })) // tap is a rxjs operator that allows us to run some code on the observable without changing the observable in any way. Inside the tap we can do whatever we want with the value that is coming through the observable. We can log it to the console, we can send it to a server, we can do whatever we want. We can also modify the value that is coming through the observable. We can change it in any way we want. We can change the value, we can change the type of the value, we can do whatever we want. We can also return a new observable from the tap. We can return a new observable from the tap and that will be the observable that is returned from the pipe. We can also return nothing from the tap and that will not change the observable in any way. It will just allow us to run some code on the observable. We can also return nothing from the tap and that will not change the observable in any way. It will just allow us to run some code on the observable.
  }
}
