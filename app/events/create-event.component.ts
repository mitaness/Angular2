import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService, IEvent } from './shared';

@Component({
    templateUrl: './create-event.component.html',
    styles: [`
        em { float:right; color: #E05C65; }
    `]
})
export class CreateEventComponent {
    isDirty = false
    event: any = {}

    constructor(private router: Router, private eventService: EventService) {
    }

    cancel() {
        console.log('aaa')
        this.router.navigate(['/'])
    }

    test(values: any) {
        console.log(values)
        console.log(this.event)
        this.event.name = "Yandex"
        this.event.date = '2028-10-11'
        this.event.time = '10:30'
        this.event.price = 100
        this.event.address = '456 Happy St'
        this.event.city = 'Felicity'
        this.event.country = 'Denmark'
        this.event.imageUrl = '//some place.jpg'
        // event.name = 'Iandex'
    }

    saveEvent(values: any) {
        this.isDirty = false
        console.log(values)
        this.eventService.addEvent(values)
        this.router.navigate(['/'])
    }
}
