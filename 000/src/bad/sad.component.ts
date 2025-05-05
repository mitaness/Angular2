import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { tap } from "rxjs";
import { Contact } from "../app/memory.service";

@Component({
   templateUrl: './sad.component.html',
   styleUrl: './sad.component.css'
})
export class SadComponent implements OnInit {
   route = inject(ActivatedRoute)
   http = inject(HttpClient)
   firstName = new FormControl('Alef')
   lastName = new FormControl('Bet')
   dob = new FormControl('xy')
   ngOnInit(): void {
      console.log('active route parameter',
         this.route.snapshot.params)
      const id = this.route.snapshot.params['id']
      console.log('active route parameter',
         this.route.snapshot.params['id'])

      this.http.post('/api/contacts', {
         id: '1280',
         firstName: 'John Carmack'
      })
         .pipe(tap(x => {
            console.log('success')
         }))
      // .subscribe()

      this.firstName.setValue('2320180 8080')
      console.log(new Date().toISOString().split('T')[0])
      this.dob.setValue(new Date().toISOString().split('T')[0])

      this.http.get<Contact>('/api/contacts/' + id)
         .pipe(tap(x => {
            console.log('data received', x)
            this.firstName.setValue(x.firstName)
            this.lastName.setValue(x.lastName)
            console.log(x.dateOfBirth)
            console.log(typeof x.dateOfBirth)
            console.log(x.dateOfBirth.toString().split('T'))
            this.dob.setValue(x.dateOfBirth.toString().split('T')[0])
         }))
         .subscribe()
   }
}