import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ISession } from '../shared';

@Component({
    templateUrl: './create-session.component.html',
})
export class CreateSessionComponent implements OnInit {
    name = new FormControl('', Validators.required)
    presenter = new FormControl('', Validators.required)
    duration = new FormControl(0, Validators.required)
    level = new FormControl('', Validators.required)
    abstract = new FormControl('', [Validators.required, Validators.maxLength(100)])

    sessionForm = new FormGroup({
        name: this.name,
        presenter: this.presenter,
        duration: this.duration,
        level: this.level,
        abstract: this.abstract,
    })

    // sessionForm = this.fb.group({
    //     name: ['', Validators.required],
    //     presenter: ['', Validators.required],
    //     duration: [0, Validators.required],
    //     level: ['', Validators.required],
    //     abstract: ['', [Validators.required, Validators.maxLength(100)]],
    // })

    // constructor(private fb: NonNullableFormBuilder) { }
    constructor() { }

    ngOnInit() {
        this.sessionForm.setValue({
            name: 'Awesome Session',
            presenter: 'John Papa',
            duration: 2,
            level: 'Beginner',
            abstract: '-'
        })
    }

    saveSession(values: any) {
        if (!this.sessionForm.valid) {
            console.log('validation errors...')
            return;
        }

        var session: ISession = {
            id: 0,
            name: values.name,
            abstract: values.abstract,
            duration: +values.duration,
            level: values.level,
            presenter: values.presenter,
            voters: []
        }
        // session = { id: 1, voters: [], ...this.sessionForm.value }
        // session = { ...this.sessionForm.value, id: 8, voters: [] };
        // session.duration = +this.duration.value
        // session.name = this.sessionForm.controls.name.value;
        // session.presenter = this.sessionForm.controls.presenter.value;
        // session.duration = this.sessionForm.controls.duration.value;
        // session.level = this.sessionForm.controls.level.value;
        // session.abstract = this.sessionForm.controls.abstract.value;
        console.log('saving...')
        console.log(this.sessionForm.value)
        console.log(values)
        console.log(session)
    }
}
