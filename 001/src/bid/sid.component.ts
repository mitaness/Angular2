import { state } from "@angular/animations";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { combineLatest, scan, startWith, tap } from "rxjs";

@Component({
   templateUrl: './sid.component.html'
})
export class SidComponent implements OnInit {
   fb = inject(FormBuilder)
   sid = this.fb.nonNullable.group({
      amount: [-1, Validators.max(30)],
      question1: this.fb.nonNullable.group({
         cb1: false,
         cb2: false,
         cb3: false,
         cb4: false,
         cb5: false,
      }),
      q3: [-1, Validators.min(1)],
      q4: [-1, Validators.min(1)],
   })

   ngOnInit(): void {
      this.t2()
   }

   t2() {
      let cb1 = this.sid.controls.question1.controls.cb1.valueChanges.pipe(startWith(false));
      let cb2 = this.sid.controls.question1.controls.cb2.valueChanges.pipe(startWith(false));
      let cb3 = this.sid.controls.question1.controls.cb3.valueChanges.pipe(startWith(false));
      let cb4 = this.sid.controls.question1.controls.cb4.valueChanges.pipe(startWith(false));
      let cb5 = this.sid.controls.question1.controls.cb5.valueChanges.pipe(startWith(false));
      combineLatest([cb1, cb2, cb3, cb4, cb5])
         .pipe(
            // tap(x => {
            //    console.log('latest', x);
            // }),
            // tap(([a, b, c, d, e]) => {
            //    console.log('latest', a, b, c, d, e);
            // }),
            scan((currentState, value) => {
               console.log('scan operator acc', currentState);
               let [a, b, c, d, e] = value;
               console.log('scan operator', [a, b, c, d, e]);
               let newState: ComboState = <ComboState>{ state: 'F', enter: () => { }, leave: () => { } }; // default

               if (e) {
                  console.log('enter state E');
                  newState = <ComboStateE>{ state: 'E', enter: () => { this.enterE() }, leave: () => { this.leaveE() } };
               } else {
                  // e is false

                  let bcd = b || c || d;
                  if (bcd) {
                     newState = <ComboStateB>{ state: 'B', enter: () => this.enterB(), leave: () => this.leaveB() };

                  } else if (a) {
                     console.log('A only');
                     console.log('enter state A');
                     newState = <ComboStateA>{ state: 'A', enter: () => this.enterA(), leave: () => this.leaveA() };
                  }
               }
               if (currentState.state != newState.state) {
                  //transition
                  console.log(`transitioning from ${currentState.state} to ${newState.state}`);

                  setTimeout(() => {
                     // escape infinite loop: .enter() calls the method itself
                     currentState.leave()
                     newState.enter()

                  }, 0);
               }
               console.log('new value ----------------', newState)
               return newState;
            }, <ComboState>{ state: 'F', enter: () => { }, leave: () => { } })
         )
         .subscribe();
   }

   disabledOption = signal<false | null>(null)

   enterA() {
      this.sid.controls.q3.disable()
      this.sid.controls.q4.disable()
   }

   leaveA() {
      this.sid.controls.q3.enable()
      this.sid.controls.q4.enable()
   }

   enterB() {
      // this.sid.controls.q3.disable()
      let value = this.sid.controls.q3.value
      if (value == 1) {
         this.sid.controls.q3.reset()
      }
      this.disabledOption.set(false)
   }

   leaveB() {
      // this.sid.controls.q3.enable()
      this.disabledOption.set(null) // enable back
   }

   enterE() {
      console.log('entering E');
      this.sid.controls.question1.controls.cb1.reset()
      this.sid.controls.question1.controls.cb2.reset()
      this.sid.controls.question1.controls.cb3.reset()
      this.sid.controls.question1.controls.cb4.reset()

      this.sid.controls.question1.controls.cb1.disable()
      this.sid.controls.question1.controls.cb2.disable()
      this.sid.controls.question1.controls.cb3.disable()
      this.sid.controls.question1.controls.cb4.disable()
   }

   leaveE() {
      console.log('leaving E');
      this.sid.controls.question1.controls.cb1.enable()
      this.sid.controls.question1.controls.cb2.enable()
      this.sid.controls.question1.controls.cb3.enable()
      this.sid.controls.question1.controls.cb4.enable()
   }

   t1() {
      let cb1 = this.sid.controls.question1.controls.cb1.valueChanges;
      cb1.pipe(scan((acc, value) => {
         console.log('change', acc, value)
         // acc.exit()
         return acc
      }, <ComboState>{ state: 'A' }))
         .subscribe()
   }
}

type ComboStateA = {
   state: 'A'
   enter(): void;
   leave(): void;
}

type ComboStateB = {
   state: 'B'
   enter(): void;
   leave(): void;
}

type ComboStateE = {
   state: 'E'
   enter(): void;
   leave(): void;
}

// other, starting state
type ComboStateF = {
   state: 'F'
   enter(): void;
   leave(): void;
}

type ComboState = ComboStateA | ComboStateB | ComboStateE | ComboStateF;