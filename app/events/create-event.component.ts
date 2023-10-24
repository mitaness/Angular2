import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './create-event.component.html',
})
export class CreateEventComponent {
    isDirty = false
    constructor(private router: Router) {
    }
    cancel() {
        console.log('aaa')
        this.router.navigate(['/'])
    }

    save() {
        this.isDirty = false
    }
}
