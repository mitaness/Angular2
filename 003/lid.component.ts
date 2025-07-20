import { Component } from "@angular/core";
import { CheckboxControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
   templateUrl: './lid.component.html',
   selector: 'lid',
   providers: [
      {
         provide: NG_VALUE_ACCESSOR,
         useExisting: LidComponent,
         multi: true
      }
   ]
})
export class LidComponent extends CheckboxControlValueAccessor {
   fill = 'yellow'
   width = 100
   checked = false
   t1() {
      console.log('dsfkjlj');
      this.fill = this.fill == 'yellow' ? 'red' : 'yellow'
      this.checked = !this.checked
      this.onChange(this.checked)
   }

   override writeValue(value: any): void {
      console.log('writeValue called', value);
      // this.checked = value
   }
}