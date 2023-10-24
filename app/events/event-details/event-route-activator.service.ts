import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { EventService } from "../shared/event.service";

@Injectable()
export class EventRouteActivator implements CanActivate {
    constructor(private router: Router, private service: EventService) {

    }

    canActivate(route: ActivatedRouteSnapshot) {
        const eventExists = !!this.service.getEvent(+route.params['id'])

        // return UrlTree
        if (!eventExists) {
            this.router.navigate(['/404'])
        }

        return eventExists;
    }
}