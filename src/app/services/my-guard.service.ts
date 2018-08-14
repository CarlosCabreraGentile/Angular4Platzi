import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AutorizacionService } from "./autorizacion.service";
import { Observable } from "rxjs";

@Injectable()
export class MyGuard implements CanActivate {
    isLogged: boolean = false;

    constructor(private autorizacionService: AutorizacionService) {
        autorizacionService.isLogged().subscribe(result => {
                if (result && result.uid) {
                    this.isLogged = true;
                }
                else {
                    this.isLogged = false;
                }
            },
            (error) => {
                this.isLogged = false;
            })
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        return this.isLogged;
    }
}