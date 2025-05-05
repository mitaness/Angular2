import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { tap } from "rxjs";
import { Contact } from "../app/memory.service";

@Component({
   templateUrl: './cad.component.html',
   styleUrl: './cad.component.css'
})
export class CadComponent implements OnInit {
   http = inject(HttpClient)
   contacts: Contact[] = []

   ngOnInit(): void {
      console.log('on init')
      this.http.get<Contact[]>('/api/contacts')
         .pipe(tap(x => {
            console.log('received data', x)
            this.contacts = x
         }))
         .subscribe()
   }
}