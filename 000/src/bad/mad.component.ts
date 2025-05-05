import { Component } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

@Component({
   templateUrl: './mad.component.html'
})
export class MadComponent {
   ticket: Ticket = {
      id: '1',
      zadavatel: 'abc',
      // resitel: '11'
   }
}

interface Ticket {
   id: string,
   zadavatel: string
}

// interface Ticket {
//    resitel: string
// }

class Simple implements ControlValueAccessor {
   writeValue(obj: any): void {
      throw new Error("Method not implemented.");
   }
   registerOnChange(fn: any): void {
      throw new Error("Method not implemented.");
   }
   registerOnTouched(fn: any): void {
      throw new Error("Method not implemented.");
   }
   setDisabledState?(isDisabled: boolean): void {
      throw new Error("Method not implemented.");
   }
}
