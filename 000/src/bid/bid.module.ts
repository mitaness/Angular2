import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BidComponent } from "./bid.component";
import { DidComponent } from "./did.component";
import { CidComponent } from "./cid.component";
import { MidComponent } from "./mid.component";

@NgModule({
   imports: [ReactiveFormsModule, CommonModule],
   declarations: [BidComponent, DidComponent, CidComponent, MidComponent]
})
export class BidModule { }