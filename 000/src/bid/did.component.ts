import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Program } from "./bid.model";
import { filter, map, mergeAll, of, Subject, switchAll, tap } from "rxjs";

@Component({
   templateUrl: './did.component.html',
   styleUrl: './did.component.css'
})
export class DidComponent implements OnInit {
   fb = inject(FormBuilder)
   did = this.fb.group({
      amount: [1, Validators.max(50)],
      customProgram: false,
   })
   recommended = Program.Conservative;

   get cidVisible() { return this.did.controls.customProgram.value === true }
   get midVisible() { return this.did.controls.customProgram.value === false }

   ngOnInit(): void {
      this.did.patchValue({
         customProgram: null
      })

      this.t2()
   }

   d$ = new Subject<Program>()

   t2() {
      this.did.controls.customProgram.valueChanges
         .pipe(
            map(x => {
               if (x) return of(Program.Custom)
               return this.d$;
               // return of(Program.Balanced, Program.Conservative);
            }),
            switchAll(),
            filter(p => p != this.recommended),
            tap(x => {
               console.log('custom program change', x)
            }))
         .subscribe()
   }

   t1() {
      this.did.controls.customProgram.valueChanges
         .pipe(
            filter(x => x == true),
            tap(x => {
               console.log('custom program change', x)
            }))
         .subscribe()
   }

   xyz(program: Program) {
      console.log('on change...', program)
      this.d$.next(program)
   }
}