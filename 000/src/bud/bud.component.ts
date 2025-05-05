import { Component, OnInit } from "@angular/core";
import { Observable, of, switchAll, tap } from "rxjs";

@Component({
   templateUrl: './bud.component.html'
})
export class BudComponent implements OnInit {
   ngOnInit(): void {
      this.t2();
   }

   t2() {
      console.log('start t2.')
      var obs1 = new Observable(subscriber => {
         subscriber.next(1)
         subscriber.next(2)
         // subscriber.complete()
         return () => console.log('clean-up 1');
      })

      var obs2 = new Observable(subscriber => {
         subscriber.next(10)
         subscriber.next(20)
         subscriber.next(30)
         // subscriber.complete()
         return () => console.log('clean-up 2');
      })

      // var high = of(obs1, obs2, obs1).pipe(switchAll())
      var high = of(obs1, obs2, obs1)
      high
         .pipe(tap(x => {
            console.log('high: value received', x)
         }))
         .subscribe()
   }

   t1() {
      console.log('start.')
      var obs1 = new Observable(subscriber => {
         subscriber.next(1)
         subscriber.next(2)
         // subscriber.complete()
         return () => console.log('clean-up');
      })

      let sub = obs1
         .pipe(tap(x => {
            console.log('value received', x)
         }))
         .subscribe()
      setTimeout(() => {
         console.log('sign off')
         sub.unsubscribe()

      }, 2000);
   }
}