import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BidComponent, CidComponent, FidComponent, MidComponent, SidComponent } from '../bid';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cid' },
  { path: 'bid', component: BidComponent },
  { path: 'cid', component: CidComponent }, // Franklin Running Club (css)
  { path: 'sid', component: SidComponent },
  { path: 'fid', component: FidComponent },
  { path: 'mid', component: MidComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
