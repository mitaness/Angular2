import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Program } from "./bid.model";
import { exhaustAll, mergeAll, of, switchAll, tap } from "rxjs";

@Component({
   templateUrl: './bid.component.html',
   styleUrl: './bid.component.css'
})
export class BidComponent implements OnInit {
   fb = inject(FormBuilder)
   bid = this.fb.group({
      amount: [1, Validators.max(50)],
      program: Program.Balanced,
      program2: Program.Dynamic
   })

   Program = Program

   ngOnInit(): void {
      var obs1 = this.bid.controls.program.valueChanges;
      var obs2 = this.bid.controls.program2.valueChanges;
      var high = of(obs1, obs2).pipe(mergeAll())
      // var high = of(obs1, obs2).pipe(switchAll())
      // var high = of(obs1, obs2).pipe(exhaustAll())
      high
         .pipe(tap(x => {
            console.log('value received', x)
         }))
         .subscribe()
   }


   test() {
      this.bid.controls.amount.disable()
   }
}