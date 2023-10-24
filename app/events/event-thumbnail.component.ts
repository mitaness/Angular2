import { Component, Input } from '@angular/core';
import { IEvent } from './shared/event.model';

@Component({
    selector: 'event-thumbnail',
    templateUrl: './event-thumbnail.component.html',
    styles: [`
        .pad-left { margin-left: 5px; }
        .thumbnail { min-height: 210px; }
        .green { background-color: green; }
    `]
})
export class EventThumbnailComponent {
    @Input() event!: IEvent;
}