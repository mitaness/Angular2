import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from '../common/toastr.service';
import { IEvent } from './shared';
import { EventService } from './shared/event.service';

// declare let toastr: any

@Component({
    selector: 'event-list',
    template: `
  <div>
    <h1>Upcoming Angular Events</h1>
    <hr>
    
    <div class="row">
        <div *ngFor="let event of events" class="col-md-5">
            <event-thumbnail (click)="handleThumbnailClick(event.name)" [event]="event"></event-thumbnail>
        </div>
    </div>

    </div>
    
    `,
})
export class EventListComponent {
    events!: IEvent[]
    constructor(private eventService: EventService,
        private route: ActivatedRoute,
        private toastrService: ToastrService) {

    }

    ngOnInit() {
        console.log('ngOnInit.....')
        console.log(this.route.snapshot.data['revents'])
        this.events = this.route.snapshot.data['revents']
        // this.eventService.getEvents().subscribe({
        //     next: x => this.events = x
        // })
        // this.events = this.eventService.getEvents()
    }

    handleThumbnailClick(eventName: string) {
        console.log(eventName)
        this.toastrService.success(eventName)
        // this.toastrService.warning(eventName)
        // toastr.success(eventName)
    }

}