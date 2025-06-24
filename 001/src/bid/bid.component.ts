import { Component, inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
   templateUrl: './bid.component.html',
   styleUrl: './bid.component.css'
})
export class BidComponent {
   fb = inject(FormBuilder)
   bid = this.fb.group({
      amount: 0
   })
}