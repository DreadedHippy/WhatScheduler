import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GauthcallbackPage } from './gauthcallback.page';

const routes: Routes = [
  {
    path: '',
    component: GauthcallbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GauthcallbackPageRoutingModule {}
