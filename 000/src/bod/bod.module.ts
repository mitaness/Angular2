import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BodComponent } from "./bod.component";

@NgModule({
   imports: [ReactiveFormsModule, CommonModule],
   declarations: [BodComponent]
})
export class BodModule { }