import { NgModule } from "@angular/core";
import { BidComponent } from "./bid.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CidComponent } from "./cid.component";
import { SidComponent } from "./sid.component";
import { FidComponent } from "./fid.component";
import { MidComponent } from "./mid.component";

@NgModule({
   imports: [ReactiveFormsModule, CommonModule],
   declarations: [BidComponent, CidComponent, SidComponent, FidComponent, MidComponent]
})
export class BidModule { }