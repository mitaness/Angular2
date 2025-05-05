import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { filter, pairwise, startWith, tap } from "rxjs";

@Component({
   templateUrl: './bod.component.html'
})
export class BodComponent implements OnInit {
   fb = inject(FormBuilder)
   bod = this.fb.group({
      amount: [10, Validators.max(50)],
      freq: 1,
      via: 1
   })

   get amount() { return this.bod.controls.amount.value }

   ngOnInit(): void {
      this.bod.controls.amount.valueChanges
         .pipe(
            startWith(null),
            pairwise(),
            filter(([a, b]) => a != b),
            tap(([a, b]) => {
               console.log('new value', a, b)
               if (b == 0) {
                  // this.bod.controls.via.setValue(1, { emitEvent: false })
                  // this.bod.controls.via.disable({ emitEvent: false })
                  this.bod.controls.via.setValue(1)
                  this.bod.controls.via.disable()
                  console.log('via set going to freq')
                  this.bod.controls.freq.setValue(1)
                  this.bod.controls.freq.disable()
               }

               if (a == 0) {
                  console.log('enabling control')
                  this.bod.controls.freq.enable()
                  this.bod.controls.via.enable()
               }
            })
         )
         .subscribe()

      this.bod.controls.via.valueChanges
         .pipe(tap(x => {
            console.log('sipo change', x)
            if (x == 3) {
               this.bod.controls.freq.setValue(1)
               this.bod.controls.freq.disable()
            }
            else {
               this.bod.controls.freq.enable()
            }
         }))
         .subscribe()
   }

}