import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { concatMap, delay, filter, generate, map, merge, mergeMap, Observable, of, range, repeat, switchMap, take, tap, withLatestFrom } from "rxjs";

@Component({
   templateUrl: './mid.component.html'
})
export class MidComponent implements OnInit {
   fb = inject(FormBuilder)
   mid = this.fb.nonNullable.group({
      cb1: false,
      cb2: false,
      cb3: false,
      cb4: false,
      cb5: false,
      question2: this.fb.nonNullable.group({
         cb1: false,
         cb2: false,
         cb3: false,
         cb4: false,
      })

   })

   ngOnInit(): void {
      // this.listenB().subscribe();
      // this.m4();
      // this.listenF2().subscribe()
      this.m6()
   }

   m6() {
      this.m4()
      this.m5()
   }

   m5() {
      let state: ComboState = this.makeState2('F')
      of(1)
         .pipe(
            concatMap(x => state.listen()),
            tap(x => {
               console.log('question 2', x);
               state.leave()
               state = x;
               state.enter()

            }),
            repeat()
         )
         .subscribe()
   }

   m4() {
      let state: ComboState = this.makeState('F')
      of(1)
         .pipe(
            concatMap(x => state.listen()),
            tap(x => {
               console.log('access', x);
               state.leave()
               state = x;
               state.enter()

            }),
            repeat()
         )
         .subscribe()
      console.log('here');

   }

   m3() {
      let state: ComboState = this.makeState('F')
      generate({
         initialState: 0,
         condition: x => x < 5,
         iterate: x => x + 1
      })
         .pipe(
            concatMap(x => state.listen()),
            tap(x => {
               console.log('access', x);
               state = x;

            })
         )
         .subscribe()
   }

   enterA() {
      let controls = this.mid.controls.question2.controls
      let cb1 = controls.cb1;
      let cb2 = controls.cb2;
      cb1.disable()
      cb2.disable()
   }
   enterB() { }
   enterE() {
      // uncheck all others
      let controls = this.mid.controls;
      let cb1 = controls.cb1;
      let cb2 = controls.cb2;
      let cb3 = controls.cb3;
      let cb4 = controls.cb4;
      cb1.reset()
      cb2.reset()
      cb3.reset()
      cb4.reset()
   }
   enterF() { }

   leaveA() {
      let controls = this.mid.controls.question2.controls
      let cb1 = controls.cb1;
      let cb2 = controls.cb2;
      cb1.enable()
      cb2.enable()

   }
   leaveB() { }
   leaveE() {
      let controls = this.mid.controls
      controls.cb5.reset()
   }
   leaveF() { }

   makeState(state: string): ComboState {
      let stateA: StateA = { state: 'A', listen: () => this.listenA(), enter: () => this.enterA(), leave: () => this.leaveA() };
      let stateB: StateB = { state: 'B', listen: () => this.listenB(), enter: () => this.enterB(), leave: () => this.leaveB() };
      let stateE: StateE = { state: 'E', listen: () => this.listenE(), enter: () => this.enterE(), leave: () => this.leaveE() };
      let stateF: StateF = { state: 'F', listen: () => this.listenF(), enter: () => this.enterF(), leave: () => this.leaveF() };

      switch (state) {
         case 'A': return stateA;
         case 'B':
         case 'C':
         case 'D':
            return stateB;
         case 'E':
            return stateE;
         case 'F':
            return stateF;
      }

      return stateF;
   }

   enterA2() { }
   enterE2() {
      // uncheck all others
      let controls = this.mid.controls.question2.controls;
      let cb1 = controls.cb1;
      let cb2 = controls.cb2;
      let cb3 = controls.cb3;
      cb1.reset()
      cb2.reset()
      cb3.reset()

   }
   enterF2() { }

   leaveA2() { }
   leaveE2() {
      let controls = this.mid.controls.question2.controls;
      controls.cb4.reset()
   }
   leaveF2() { }

   makeState2(state: string): ComboState {
      let stateA: StateA = { state: 'A', listen: () => this.listenA2(), enter: () => this.enterA2(), leave: () => this.leaveA2() };
      let stateE: StateE = { state: 'E', listen: () => this.listenE2(), enter: () => this.enterE2(), leave: () => this.leaveE2() };
      let stateF: StateF = { state: 'F', listen: () => this.listenF2(), enter: () => this.enterF2(), leave: () => this.leaveF2() };

      switch (state) {
         case 'A':
            return stateA;
         case 'E':
            return stateE;
         case 'F':
            return stateF;
      }

      return stateF;
   }

   listenA2(): Observable<ComboState> {
      let controls = this.mid.controls.question2.controls;

      let cb1 = controls.cb1.valueChanges;
      let cb2 = controls.cb2.valueChanges;
      let cb3 = controls.cb3.valueChanges;

      let stream1 = merge(cb1, cb2, cb3)
         .pipe(
            map(x => {
               let values = [controls.cb1.value, controls.cb2.value, controls.cb3.value]
               let [a, b, c] = values;
               let abc = a || b || c;
               return abc;
            }),
            filter(x => !x),
            map(x => 'F')
         );

      let cb4 = controls.cb4.valueChanges.pipe(filter(x => x), map(x => 'E'));

      return merge(stream1, cb4)
         .pipe(
            take(1),
            tap(x => {
               console.log('signal commt', x);
            }),
            map(x => this.makeState2(x)))
   }

   listenE2(): Observable<ComboState> {
      // initial state: only E is checked
      let controls = this.mid.controls.question2.controls;
      let cb1 = controls.cb1.valueChanges.pipe(filter(x => x), map(x => 'A')); //default
      let cb2 = controls.cb2.valueChanges.pipe(filter(x => x), map(x => 'A'));
      let cb3 = controls.cb3.valueChanges.pipe(filter(x => x), map(x => 'A'));
      let cb4 = controls.cb4.valueChanges.pipe(filter(x => !x), map(x => 'F'));
      return merge(cb1, cb2, cb3, cb4)
         .pipe(
            take(1),
            tap(x => {
               console.log('signal commt', x);
            }),
            map(x => this.makeState2(x)))
   }

   listenE(): Observable<ComboState> {
      // initial state: only E is checked
      let controls = this.mid.controls;
      let cb1 = controls.cb1.valueChanges.pipe(filter(x => x), map(x => 'A')); //default
      let cb2 = controls.cb2.valueChanges.pipe(filter(x => x), map(x => 'B'));
      let cb3 = controls.cb3.valueChanges.pipe(filter(x => x), map(x => 'C'));
      let cb4 = controls.cb4.valueChanges.pipe(filter(x => x), map(x => 'D'));
      let cb5 = controls.cb5.valueChanges.pipe(filter(x => !x), map(x => 'F'));
      return merge(cb1, cb2, cb3, cb4, cb5)
         .pipe(
            take(1),
            tap(x => {
               console.log('signal commt', x);
            }),
            map(x => this.makeState(x)))
   }

   listenA(): Observable<ComboState> {
      // initial state: only A is checked
      let controls = this.mid.controls;
      let cb1 = controls.cb1.valueChanges.pipe(filter(x => !x), map(x => 'F')); //default
      let cb2 = controls.cb2.valueChanges.pipe(filter(x => x), map(x => 'B'));
      let cb3 = controls.cb3.valueChanges.pipe(filter(x => x), map(x => 'C'));
      let cb4 = controls.cb4.valueChanges.pipe(filter(x => x), map(x => 'D'));
      let cb5 = controls.cb5.valueChanges.pipe(filter(x => x), map(x => 'E'));
      return merge(cb1, cb2, cb3, cb4, cb5)
         .pipe(
            take(1),
            tap(x => {
               console.log('signal commt', x);
            }),
            map(x => this.makeState(x)))
   }

   m2() {
      let controls = this.mid.controls;


      let cb2 = controls.cb2.valueChanges;
      let cb3 = controls.cb3.valueChanges;
      let cb4 = controls.cb4.valueChanges;
      let cb5 = controls.cb5.valueChanges.pipe(filter(x => x), map(x => 'E'));

      let stream1 = merge(cb2, cb3, cb4)
         .pipe(
            map(x => {
               let values = [controls.cb2.value, controls.cb3.value, controls.cb4.value]
               let [b, c, d] = values;
               let bcd = b || c || d;
               return bcd;
            }),
            filter(x => !x),
            map(x => 'B'),
            // take(1),
            tap(x => {
               console.log('signal commt', x);
            })
         )

      merge(stream1, cb5).pipe(tap(x => {
         console.log('lsdfjl', x);

      })).subscribe()
   }

   listenB(): Observable<ComboState> {
      let controls = this.mid.controls;


      let cb2 = controls.cb2.valueChanges;
      let cb3 = controls.cb3.valueChanges;
      let cb4 = controls.cb4.valueChanges;
      let cb5 = controls.cb5.valueChanges.pipe(filter(x => x), map(x => 'E'));

      let stream1 = merge(cb2, cb3, cb4)
         .pipe(
            map(x => {
               let values = [controls.cb2.value, controls.cb3.value, controls.cb4.value]
               let [b, c, d] = values;
               let bcd = b || c || d;
               return bcd;
            }),
            filter(x => !x),
            // map(x => 'B')
            map(x => {
               let a = controls.cb1.value;
               return a ? 'A' : 'F'
            })
         );

      return merge(stream1, cb5)
         .pipe(
            take(1),
            tap(x => {
               console.log('signal commt', x);
            }),
            map(x => this.makeState(x)))
   }

   listenF(): Observable<ComboState> {
      let controls = this.mid.controls;
      let cb1 = controls.cb1.valueChanges.pipe(filter(x => x), map(x => 'A'));
      let cb2 = controls.cb2.valueChanges.pipe(filter(x => x), map(x => 'B'));
      let cb3 = controls.cb3.valueChanges.pipe(filter(x => x), map(x => 'C'));
      let cb4 = controls.cb4.valueChanges.pipe(filter(x => x), map(x => 'D'));
      let cb5 = controls.cb5.valueChanges.pipe(filter(x => x), map(x => 'E'));
      return merge(cb1, cb2, cb3, cb4, cb5)
         .pipe(
            take(1),
            tap(x => {
               console.log('signal commt', x);
            }),
            map(x => this.makeState(x)))
   }

   listenF2(): Observable<ComboState> {
      let controls = this.mid.controls.question2.controls;
      let cb1 = controls.cb1.valueChanges.pipe(filter(x => x), map(x => 'A'));
      let cb2 = controls.cb2.valueChanges.pipe(filter(x => x), map(x => 'A'));
      let cb3 = controls.cb3.valueChanges.pipe(filter(x => x), map(x => 'A'));
      let cb4 = controls.cb4.valueChanges.pipe(filter(x => x), map(x => 'E'));
      return merge(cb1, cb2, cb3, cb4)
         .pipe(
            take(1),
            tap(x => {
               console.log('signal commt', x);
            }),
            map(x => this.makeState2(x)))
   }

   m1() {
      let controls = this.mid.controls;
      let cb1 = controls.cb1.valueChanges.pipe(filter(x => x), map(x => 'A'));
      let cb2 = controls.cb2.valueChanges.pipe(filter(x => x), map(x => 'B'));
      let cb3 = controls.cb3.valueChanges.pipe(filter(x => x), map(x => 'C'));
      let cb4 = controls.cb4.valueChanges.pipe(filter(x => x), map(x => 'D'));
      let cb5 = controls.cb5.valueChanges.pipe(filter(x => x), map(x => 'E'));
      let test = merge(cb1, cb2, cb3, cb4, cb5)
         .pipe(
            take(1),
            tap(x => {
               console.log('signal commt', x);

            }),
            map(x => {
               switch (x) {
                  case 'A':
                     return { state: 'A' };
                  case 'B':
                  case 'C':
                  case 'D':
                     return { state: 'B' }
                  case 'E':
                     return { state: 'E' }
               }
               return { state: 'D' };
            }),
            map(x => of(x)))
      // .subscribe()

      test.subscribe()
   }

   t10() {
      // let state: ComboState = { state: 'F', listen: () => this.listenF() }
      let state = this.makeState('F')
      generate({
         initialState: 0,
         condition: x => x < 3,
         iterate: x => x + 1
      })
         .pipe(
            tap(x => {
               console.log('app', x);
            }),
            concatMap(x => state.listen()),
            tap(x => {
               console.log('access', x);

            })
         )
         .subscribe()
   }

   t9() {
      let state = this.makeState('F')
      // let state: ComboState = { state: 'A', listen: () => of({ state: 'B', listen: () => of() }) }
      generate({
         initialState: 0,
         condition: x => x < 3,
         iterate: x => x + 1
      })
         .pipe(
            tap(x => {
               console.log('app', x);
            }),
            concatMap(x => state.listen()),
            tap(x => {
               console.log('access', x);

            })
         )
         .subscribe()
   }

   t8() {
      generate({
         initialState: 0,
         condition: x => x < 3,
         iterate: x => x + 1
      })
         .pipe(
            tap(x => {
               console.log('app', x);
            }),
            switchMap(x => of(x).pipe(delay(1000 * x))),
            tap(x => {
               console.log('access', x);

            })
         )
         .subscribe()
   }

   t7() {
      generate({
         initialState: 0,
         condition: x => x < 3,
         iterate: x => x + 1
      })
         .pipe(
            tap(x => {
               console.log('app', x);
            }),
            concatMap(x => of(1).pipe(delay(1000 * x))),
            tap(x => {
               console.log('access event', x);

            })
         )
         .subscribe()
   }

   t6() {
      generate({
         initialState: 0,
         condition: x => true,
         iterate: x => x
      }).pipe(
         take(10),
         tap(x => {
            console.log('app', x);

         }))
         .subscribe()
      // generate(0, x => x < 3, x => x + 1)
      //    .pipe(tap(x => {
      //       console.log('generate', x);

      //    }))
      //    .subscribe()
   }

   t5() {
      range(-1, 8)
         .pipe(take(11),
            tap(x => {
               console.log('tap', x);

            }))
         .subscribe()
   }

   t4() {
      let controls = this.mid.controls;
      let cb2 = controls.cb2.valueChanges;
      let cb3 = controls.cb3.valueChanges;
      let cb4 = controls.cb4.valueChanges;
      merge(cb2, cb3, cb4)
         .pipe(
            map(x => {
               let values = [controls.cb2.value, controls.cb3.value, controls.cb4.value]
               let [a, b, c] = values;
               let abc = a || b || c;
               return abc;
            }),
            filter(x => !x),
            take(1),
            tap(x => {
               console.log('signal commt', x);
            })
         )
         .subscribe()
   }

   t3() {
      let controls = this.mid.controls;
      let cb2 = controls.cb2.valueChanges;
      let cb3 = controls.cb3.valueChanges;
      let cb4 = controls.cb4.valueChanges;
      merge(cb2, cb3, cb4)
         .pipe(
            tap(x => {
               let values = [controls.cb2.value, controls.cb3.value, controls.cb4.value]
               console.log('signal commt', x, values);

            }))
         .subscribe()
   }

   t2() {
      let controls = this.mid.controls;
      let cb1 = controls.cb1.valueChanges;
      let cb2 = controls.cb2.valueChanges;
      let cb5 = controls.cb5.valueChanges;
      merge(cb1, cb5)
         .pipe(
            withLatestFrom(cb2),
            tap(x => {
               console.log('signal commt', x);

            }))
         .subscribe()
   }

   t1() {
      let controls = this.mid.controls;
      let cb1 = controls.cb1.valueChanges;
      let cb5 = controls.cb5.valueChanges;
      merge(cb1, cb5)
         .pipe(tap(x => {
            console.log('signal commt', x);

         }))
         .subscribe()
   }
}

type StateA = {
   state: 'A'
   listen(): Observable<ComboState>;
   enter(): void;
   leave(): void;
}

type StateB = {
   state: 'B'
   listen(): Observable<ComboState>;
   enter(): void;
   leave(): void;
}

type StateE = {
   state: 'E'
   listen(): Observable<ComboState>;
   enter(): void;
   leave(): void;
}

type StateF = {
   state: 'F'
   listen(): Observable<ComboState>;
   enter(): void;
   leave(): void;
}

type ComboState = StateA | StateB | StateE | StateF