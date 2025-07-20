import { Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
   templateUrl: './sid.component.html',
   selector: 'sid'
})
export class SidComponent {
   fb = inject(FormBuilder)
   sid = this.fb.group({
      amount: [-1, Validators.min(10)]
   })
}