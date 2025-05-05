import { Component, OnInit } from "@angular/core";

@Component({
   templateUrl: './cid.component.html',
   selector: 'cid'
})
export class CidComponent implements OnInit {
   ngOnInit(): void {
      console.log('cid on init (C)')
   }
}