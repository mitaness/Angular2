import { Routes } from "@angular/router";
import { Error404Component } from "./errors/404.component";
import {
    EventDetailsComponent,
    EventRouteActivator,
    EventListResolver,
    CreateEventComponent,
    EventListComponent
} from './events'

export const appRoutes: Routes = [
    { path: 'event/list', component: EventListComponent, resolve: { revents: EventListResolver } },
    { path: 'event/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
    { path: 'event/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator] },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: 'event/list', pathMatch: 'full' },
    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    }
]