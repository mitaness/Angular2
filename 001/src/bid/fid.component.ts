import { Component, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { bufferCount, combineLatest, filter, map, range, scan, single, startWith, tap } from "rxjs";

@Component({
   templateUrl: './fid.component.html'
})
export class FidComponent implements OnInit {
   fb = inject(FormBuilder)
   fid = this.fb.nonNullable.group({
      amount: [-1, Validators.max(15)],
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
      this.t3()
   }

   disable_access = signal<true | null>(null); // true to disable 

   t3() {
      let cb1 = this.fid.controls.question1.controls.cb1.valueChanges.pipe(startWith(false));
      let cb2 = this.fid.controls.question1.controls.cb2.valueChanges.pipe(startWith(false));
      let cb3 = this.fid.controls.question1.controls.cb3.valueChanges.pipe(startWith(false));
      let cb4 = this.fid.controls.question1.controls.cb4.valueChanges.pipe(startWith(false));
      let cb5 = this.fid.controls.question1.controls.cb5.valueChanges.pipe(startWith(false));

      combineLatest([cb1, cb2, cb3, cb4, cb5])
         .pipe(
            tap(x => {
               console.log('combine', x);

            }),
            map(x => {
               let [a, b, c, d, e] = x;

               if (e) {
                  return <ComboStateNone>{ state: 'N', enter: () => this.enterNone(), leave: () => this.leaveNone() }
               }

               if (b || c || d) {
                  return <ComboStateB>{ state: 'B', enter: () => this.enterB(), leave: () => this.leaveB() }
               }

               if (a) {
                  return <ComboStateA>{ state: 'A', enter: () => this.enterA(), leave: () => this.leaveA() }
               }
               return <ComboStateF>{ state: 'F', enter: () => { }, leave: () => { } };
            }),
            bufferCount(2, 1),
            tap(x => {
               console.log('buffer', x);
            }),
            filter(([prev, current]) => {
               console.log('');
               return prev.state != current.state;
            }),
            tap(([prev, next]) => {
               console.log('change');
               // Function.bind(this, )
               // prev.leave.bind(this)
               // next.enter.bind(this)()
               prev.leave()
               next.enter()
            }),
         )
         .subscribe()
   }

   enterA() {

   }

   leaveA() {

   }

   enterB() {
      let value = this.fid.controls.q3.value
      if (value == 1) {
         // undo the selection
         this.fid.controls.q3.reset()
      }

      value = this.fid.controls.q4.value
      if (value == 1) {
         // undo the selection
         this.fid.controls.q4.reset()
      }
      this.disable_access.set(true)
   }

   leaveB() {
      this.disable_access.set(null)

   }

   enterNone() {
      console.log('entering none', this.fid);
      this.fid.controls.question1.controls.cb1.reset()
      this.fid.controls.question1.controls.cb2.reset()
      this.fid.controls.question1.controls.cb3.reset()
      this.fid.controls.question1.controls.cb4.reset()

      this.fid.controls.question1.controls.cb1.disable()
      this.fid.controls.question1.controls.cb2.disable()
      this.fid.controls.question1.controls.cb3.disable()
      this.fid.controls.question1.controls.cb4.disable()

   }

   leaveNone() {
      console.log('leaving none', this.fid);
      this.fid.controls.question1.controls.cb1.enable()
      this.fid.controls.question1.controls.cb2.enable()
      this.fid.controls.question1.controls.cb3.enable()
      this.fid.controls.question1.controls.cb4.enable()
   }

   t2() {
      this.fid.controls.question1.valueChanges
         .pipe(
            tap(x => {
               console.log('jsdlfjl', x);
               console.log('=', x.cb1?.valueOf());

            }),
            scan((a: ComboState, x) => {

               if (x.cb5?.valueOf()) {
                  return <ComboStateF>{ state: 'F' }
               }

               if (x.cb1?.valueOf()) {
                  return <ComboStateA>{ state: 'A' }
               }


               if (x.cb2?.valueOf() || x.cb3?.valueOf() || x.cb4?.valueOf()) {
                  return <ComboStateB>{ state: 'B' }
               }

               return a;
            }, <ComboState>{ state: 'F' }),
            bufferCount(2, 1),
            tap(x => {
               console.log('result', x);

            }),
            startWith('s')

         )
         .subscribe()
   }

   t1(): void {
      range(1, 13)
         .pipe(
            bufferCount(2, 1),
            tap(x => {
               console.log('new value', x);

            }))
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

type ComboStateNone = {
   state: 'N'
   enter(): void;
   leave(): void;
}

// other, starting state
type ComboStateF = {
   state: 'F'
   enter(): void;
   leave(): void;
}

type ComboState = ComboStateA | ComboStateB | ComboStateNone | ComboStateF;