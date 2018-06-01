//import { Http } from '@angular/http';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { LoaderService } from './loader.service';

@Injectable()

export class loadingInterceptor implements HttpInterceptor {

    constructor(private loaderService:LoaderService){}

    intercept(req: HttpRequest<1>, next: HttpHandler) : Observable<HttpEvent<1>> {
        this.loaderService.display(true);
        next.handle(req).subscribe((observer: any) => {
            if(observer.status == 200){
                let timer = Observable.timer(1000);
                timer.subscribe(t => {
                    this.loaderService.display(false); 
                });
            }
        });
        return next.handle(req);
    }


}