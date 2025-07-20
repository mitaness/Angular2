import { NgModule } from "@angular/core";
import { BidComponent } from "./bid.component";
import { SidComponent } from "./sid.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RidComponent } from "./rid.component";

const routes: Routes = [
   {
      path: 'bid',
      component: BidComponent,
      children: [
         { path: '', component: SidComponent },
         { path: 'rid', component: RidComponent },
      ]
   },
];

@NgModule({
   imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
   declarations: [BidComponent, SidComponent, RidComponent]
})
export class BidModule { }