import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../shared/event.service';

@Component({
    templateUrl: './event-details.component.html',
    styles: [`
        .event-image { height: 100px; }
    `]
})
export class EventDetailsComponent {
    event: any
    constructor(private eventService: EventService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        console.log('activated route is', this.route.snapshot.params['id']);
        // console.log('activated route 2 is', this.route.snapshot.params['ID']);
        this.event =
            this.eventService.getEvent(+this.route.snapshot.params['id'])
        console.log(this.event)
    }
}
