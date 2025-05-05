import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  BadComponent, CadComponent,
  CalComponent, MadComponent, SadComponent
} from '../bad';
import { BudComponent } from '../bud';
import { BidComponent, DidComponent } from '../bid';
import { BodComponent } from '../bod';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'did' },
  { path: '', pathMatch: 'full', redirectTo: 'bod' },
  { path: 'bad', component: BadComponent },
  { path: 'cal', component: CalComponent },
  { path: 'sad/:id', component: SadComponent },
  { path: 'cad', component: CadComponent },
  { path: 'mad', component: MadComponent },
  { path: 'bud', component: BudComponent },
  { path: 'bid', component: BidComponent },
  { path: 'did', component: DidComponent },
  { path: 'bod', component: BodComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
