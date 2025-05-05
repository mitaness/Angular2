import { Component, EventEmitter, inject, OnInit, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Program } from "./bid.model";
import { tap } from "rxjs";

@Component({
   templateUrl: './mid.component.html',
   selector: 'mid'
})
export class MidComponent implements OnInit {
   fb = inject(FormBuilder)
   mid = this.fb.group({
      program: Program.Balanced
   })

   @Output()
   programChange = new EventEmitter<Program>()

   ngOnInit(): void {
      console.log('mid on init (B)')
      this.mid.controls.program.valueChanges
         .pipe(tap(x => {
            if (x)
               this.programChange.emit(x)
         }))
         .subscribe()

      this.mid.patchValue({
         program: null
      })
   }
}