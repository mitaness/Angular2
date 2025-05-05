import { NgModule } from "@angular/core";
import { BadComponent } from "./bad.component";
import { CalComponent } from "./cal.component";
import { SadComponent } from "./sad.component";
import { CadComponent } from "./cad.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MadComponent } from "./mad.component";
import { WadComponent } from "./wad.component";

@NgModule({
   imports: [RouterModule, CommonModule, ReactiveFormsModule],
   declarations: [
      BadComponent,
      CalComponent,
      SadComponent,
      CadComponent,
      MadComponent,
      WadComponent
   ]
})
export class BadModule { }